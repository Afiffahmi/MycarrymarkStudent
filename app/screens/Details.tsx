import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, ImageBackground, StyleSheet } from "react-native";
import { DataTable, IconButton, MD3Colors } from "react-native-paper";
import { SegmentedButtons } from "react-native-paper";
import { BottomTabBar } from "@react-navigation/bottom-tabs";

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
  const { item } = route.params;
  const { studentId } = route.params;

  useEffect(() => {
    fetch(
      `https://mycarrymark-node-afiffahmis-projects.vercel.app/class/${item.id}/grading`
    )
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      });
  }, []);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, item.length);

  return (
    <SafeAreaView style={styles.container}>
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
        theme={{ colors: { secondaryContainer: 'pink' } }}
        buttons={[
          {
            icon: "forum-outline",
            value: "Forum",
            label: "Forum",
            onPress: () => console.log("Forum pressed"),
          },
          {
            icon: "chart-bar",
            value: "Performance",
            label: "Performance",
            onPress: () => console.log("Performance pressed"),
          },
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
              {grading.grades.map((grade, gradeIndex) => (
                <DataTable.Row key={gradeIndex}>
                  <DataTable.Cell style={{ left: 20 }}>
                    {grade.assessmentName}
                  </DataTable.Cell>
                  <DataTable.Cell numeric style={{ right: 20 }}>
                    {grade.grade}
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
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
    </SafeAreaView>
  );
};

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
