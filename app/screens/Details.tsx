import { View, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { DataTable, IconButton, MD3Colors, Modal, Portal, Text, Button, PaperProvider, Icon, Snackbar } from "react-native-paper";
import { SegmentedButtons } from "react-native-paper";
import axios from "axios";

type Assessment = {
  score: string;
  weighted: string;
  assessmentName: string;
};

type CourseworkItem = {
  id: string;
  coursework: Assessment[];
};

type StudentItem = {
  id: string;
  avatar: string;
  studentid: string;
  email: string;
  online: boolean;
  name: string;
};

type GradingItem = {
  id: string;
  assessmentName: string;
  score: number;
  weighted: number;
  studentId: string;
  grades: { assessmentName: string; grade: string }[];
};

type Data = {
  grading: GradingItem[];
  coursework: CourseworkItem[];
  student: StudentItem[];
};

interface Performance {
  averageGrade: number;
  totalWeighted: number;
  totalWeightedAll: number;
  performanceRating : number;
}

const Details = ({ route, navigation }: any) => {
  const [data, setData] = useState<Data>({
    grading: [],
    coursework: [],
    student: [],
  });
  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );
  const [value, setValue] = useState("");
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const hideGpModal = () => setGpVisible(false);

  const { item } = route.params;
  const { studentId } = route.params;
  const [performance, setPerformance] = useState<Performance>({averageGrade:0.0,totalWeighted:0,totalWeightedAll:0,performanceRating:0.0});
  const [grades, setGrades] = useState<{ [key: string]: any }>({});
  const[prediction,setPrediction] = useState<any>(null);
  const [gpMessage, setGpMessage] = useState<string>('We re processing your prediction!');
  const [gpVisible, setGpVisible] = useState<boolean>(false);

  useEffect(() => {
    fetch(
      `https://mycarrymark-node-afiffahmis-projects.vercel.app/class/${item.id}/grading`
    )
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      });
      data.grading.forEach((grading) => {
        if (studentId === grading.studentId) {
          const total = grading.grades.reduce((total, grade) => total + Number(grade.grade), 0);
          let newGrades: { [key: string]: any } = {
            'student_id': studentId,
            'test1': 0,
            'test2': 0,
            'assignment1': 0,
            'assignment2': 0,
            'quiz1': 0,
            'carrymark': total,
           
          };
          grading.grades.forEach((grade) => {
            newGrades[grade.assessmentName] = grade.grade;
          });
          setGrades(newGrades);
        }
      });
      fetchPerformance();
  }, [data,studentId]);

  const fetchPerformance = async () => {
    try{
      const response = await fetch( `https://mycarrymark-node-afiffahmis-projects.vercel.app/class/${item.id}/average-grade`);
      const data = await response.json();
      setPerformance(data);
    }catch(e){
      console.error('Error:', e);
    }
  }
  const onDismissSnackBar = () => setGpVisible(false);

  
  const gradePrediction = async () => {
    setGrades(prevGrades => {
      return {...prevGrades, student_id: studentId,};
    });
    try{
      setGpVisible(true);
      const gradesArray = [grades];
      const response = await axios.post( `https://grade-prediction-api.onrender.com/predict`,gradesArray)
      .then((response) => {
        setPrediction(response.data.Predictions[0].Prediction);
        console.log(response.data.Predictions[0].Prediction)
      });
    }catch(e){
      console.error('Error:', e);
    }
  }


  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, item.length);

  return (
    <SafeAreaView style={styles.container}>
      <PaperProvider>
      <Portal>
      <Modal visible={gpVisible} onDismiss={hideGpModal} contentContainerStyle={container2Style}>
          <View style={{justifyContent:'space-between',alignSelf:'center',alignItems:'center',alignContent:'center'}}>
            <Text>Your Prediction Grade</Text>
          <Text style={{fontSize:20,fontWeight:'bold'}}>{prediction}</Text>
          <Text>This only prediction, your result still based on yourself during final examination</Text>
          </View>
        </Modal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Class Performance</DataTable.Title>
                <DataTable.Title numeric>Score</DataTable.Title>
              </DataTable.Header>
              <DataTable.Row>
                <DataTable.Cell>Average Grade</DataTable.Cell>
                <DataTable.Cell numeric>{Number(performance.averageGrade).toFixed(2)}%</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row
              >
                <DataTable.Cell>Total Carrymark</DataTable.Cell>
                <DataTable.Cell numeric>{Number(performance.totalWeighted)}%</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row
              style={{
                backgroundColor: "pink",
                padding: 15,
                position: "relative",
              }}>
                <Icon source='star' color='yellow' size={20} />
                <DataTable.Cell>Performance Rating</DataTable.Cell>
                <DataTable.Cell numeric>{Number(performance.performanceRating).toFixed(2)} /10</DataTable.Cell>
              </DataTable.Row>
              <Text style={{top:10,color:'grey'}}>Tap anywhere to dismiss.</Text>
            </DataTable>
         
         
          </View>
        </Modal>
      </Portal>
      <ImageBackground
        source={{ uri: item.selectedImage }}
        style={styles.image}
      >
        <View
          style={{ ...styles.image, borderRadius: 100, overflow: "hidden" }}
        />
      </ImageBackground>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{item.courseCode}</Text>
        <Text style={styles.text}>{item.courseName}</Text>
        <Text style={styles.classtext}>{item.groupClass}</Text>
      </View>
      <View style={{ flexDirection: "row", position: "absolute" }}>
        <IconButton
          icon="arrow-left"
          iconColor={MD3Colors.tertiary80}
          size={25}
          mode="contained-tonal"
          onPress={() => navigation.goBack()}
        />
      </View>
      <SegmentedButtons
        style={{ margin: 5 }}
        value={value}
        onValueChange={setValue}
        theme={{ colors: { secondaryContainer: '#FF8080', onSecondaryContainer:'white' } }}
        buttons={[
          {
            icon: "forum-outline",
            value: "Forum",
            label: "Forum",
            onPress: () => navigation.navigate('Forum',{item}),
          },
          {
            icon: "chart-bar",
            value: "Performance",
            label: "Performance",
            onPress: () => showModal(),
          },
          
          ...(item.predictive ? [{
    icon: "chart-areaspline",
    value: "Grade Prediction",
    label: "Prediction",
    onPress: () => gradePrediction(),
  }] : [])
]}
          
        
      />
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Assessment Name</DataTable.Title>
          <DataTable.Title numeric>Carrymark(%)</DataTable.Title>
        </DataTable.Header>

        {data.grading.map((grading, index) =>
          studentId === grading.studentId ? (
            
            <>
              {grading.grades.map((grade, gradeIndex) => {
                
                return (
                <DataTable.Row key={gradeIndex}>
                  <DataTable.Cell style={{ left: 20 }}>
                    {grade.assessmentName}
                  </DataTable.Cell>
                  <DataTable.Cell numeric style={{ right: 20 }}>
                    {grade.grade} 
                  </DataTable.Cell>
                </DataTable.Row>);
})}
              <DataTable.Row
                style={{
                  backgroundColor: "lightgrey",
                  padding: 15,
                  position: "relative",
                }}
              >
                <DataTable.Cell>
                  <Text style={{ fontWeight: "700", fontSize: 18, left: 20 }}>
                    Total
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  <Text style={{ fontWeight: "700", fontSize: 18 }}>
                    {grading.grades.reduce(
                      (total, grade) => total + Number(grade.grade),
                      0
                    )}
                    %
                    
                  </Text>
                </DataTable.Cell>
              </DataTable.Row>
            </>
          ) : null
        )}
      </DataTable>
      <Snackbar
        visible={gpVisible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Undo',
          onPress: () => {
            // Do something
          },
        }}>
        {gpMessage}
      </Snackbar>
      </PaperProvider>
    </SafeAreaView>
  );
};
const containerStyle = {backgroundColor: 'white', padding: 20, borderRadius: 10, margin:5};
const container2Style = {backgroundColor: 'white', padding: 20, borderRadius: 10,margin:20};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 150,
  },
  textContainer: {
    position: "absolute",
    top: 40,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 24,
  },
  subtext: {
    color: "white",
    fontSize: 20,
  },
  classtext: {
    color: "grey",
    fontSize: 18,
  },
});

export default Details;
