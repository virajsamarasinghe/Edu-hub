import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from 'expo-router';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Resources = () => {
  const router = useRouter();
  const [showAllActivities, setShowAllActivities] = useState(false); // Toggle between compact and full view
  const [showAllTheoryFiles, setShowAllTheoryFiles] = useState(false); // Toggle for theory class files
  const [showAllPaperFiles, setShowAllPaperFiles] = useState(false); // Toggle for paper class files

  const activities = [
    {
      date: "31",
      title: "Meeting with the VC",
      link: "https://zoom.com",
      time: "10 A.M - 11 A.M",
      status: "Due soon",
      color: "red",
    },
    {
      date: "04",
      title: "Meeting with the J...",
      link: "https://zoom.com",
      time: "10 A.M - 11 A.M",
      status: "Upcoming",
      color: "orange",
    },
    {
      date: "12",
      title: "Class B middle session",
      link: "Physical science lab",
      time: "10 A.M - 11 A.M",
      status: "Upcoming",
      color: "orange",
    },
    {
      date: "16",
      title: "Send Mr Ayo class...",
      link: "Send Document via email",
      time: "10 A.M - 11 A.M",
      status: "Upcoming",
      color: "orange",
    },
  ];

  const files = [
    {
      title: "Class A 1st semester result",
      date: "04 May, 09:20AM",
      downloadLink: "https://example.com/class-a-result.pdf",
    },
    {
      title: "Kelvin college application",
      date: "01 Aug, 04:20PM",
      downloadLink: "https://example.com/kelvin-college-application.pdf",
    },
    {
      title: "Class E attendance sheet",
      date: "01 Oct, 08:20AM",
      downloadLink: "https://example.com/class-e-attendance.pdf",
    },
  ];

  const renderActivityCard = (item: { date: string; title: string; link: string; time: string; status: string; color: string }) => (
    <TouchableOpacity onPress={() => Linking.openURL(item.link)} key={item.date}>
      <View style={[styles.activityCard, !showAllActivities ? styles.compactCard : styles.fullWidthCard]}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{item.date}</Text>
        </View>
        <View style={styles.activityDetails}>
          <Text style={styles.activityTitle}>{item.title}</Text>
          <Text style={styles.activityLink}>{item.link}</Text>
          <View style={styles.activityFooter}>
            <Text style={styles.activityTime}>{item.time}</Text>
            <Text style={[styles.activityStatus, { color: item.color }]}>{item.status}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderFiles = (file: { title: string; date: string; downloadLink: string }, index: number) => (
    <TouchableOpacity onPress={() => Linking.openURL(file.downloadLink)} key={index}>
      <View style={[styles.horizontalCard, (!showAllPaperFiles && !showAllTheoryFiles) ? styles.compactCard : styles.fullWidthCard]}>
        <Ionicons name="document-text-outline" size={24} color="#8C78F0" />
        <View style={styles.fileDetails}>
          <Text style={styles.fileTitle}>{file.title}</Text>
          <Text style={styles.fileDate}>{file.date}</Text>
        </View>
        <Ionicons name="cloud-download-outline" size={24} color="#8C78F0" />
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={["#8C78F0", "#D1C4F7"]} style={styles.container}>
      <View style={styles.header}>
       <TouchableOpacity  onPress={() => router.back()}>
                           <Ionicons name="arrow-back" size={24} color="#fff" />
                       </TouchableOpacity>
        <Text style={styles.headerText}>Resources</Text>
        <Ionicons name="notifications-outline" size={24} color="#fff" />
      </View>

      <ScrollView style={styles.scrollContainer}>
        {/* Activities Section */}
        <View style={styles.cardContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Activities</Text>
            <TouchableOpacity onPress={() => setShowAllActivities(!showAllActivities)}>
              <Text style={styles.seeAll}>{showAllActivities ? "Show Less" : "See All"}</Text>
            </TouchableOpacity>
          </View>

          <View style={showAllActivities ? styles.activitiesVertical : styles.activitiesGrid}>
            {activities.map((activity) => renderActivityCard(activity))}
          </View>
        </View>

        {/* Theory Class Section */}
        <View style={styles.cardContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Theory Class</Text>
            <TouchableOpacity onPress={() => setShowAllTheoryFiles(!showAllTheoryFiles)}>
              <Text style={styles.seeAll}>{showAllTheoryFiles ? "Show Less" : "See All"}</Text>
            </TouchableOpacity>
          </View>

          <View style={showAllTheoryFiles ? styles.activitiesVertical : styles.activitiesGrid}>
            {files.map(renderFiles)}
          </View>
        </View>

        {/* Paper Class Section */}
        <View style={styles.cardContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Paper Class</Text>
            <TouchableOpacity onPress={() => setShowAllPaperFiles(!showAllPaperFiles)}>
              <Text style={styles.seeAll}>{showAllPaperFiles ? "Show Less" : "See All"}</Text>
            </TouchableOpacity>
          </View>

          <View style={showAllPaperFiles ? styles.activitiesVertical : styles.activitiesGrid}>
            {files.map(renderFiles)}
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 20,
  },
  headerText: {
    color: '#ffffff',
    fontSize: hp('3.8%'),
    fontWeight: '600',
    position: 'absolute',
    left: wp('3%'),
    top: hp('10%'),
  },
  scrollContainer: {
    flex: 1,
  },
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    top: hp('12%'),
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  seeAll: {
    color: "#8C78F0",
    fontWeight: "bold",
  },
  activitiesGrid: {
    flexDirection: "row",
    flexWrap: "nowrap",
    overflow: "scroll",
  },
  activitiesVertical: {
    flexDirection: "column",
  },
  activityCard: {
    width: 150,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    margin: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  compactCard: {
    width: 150, // Compact width when "See All" is not clicked
  },
  fullWidthCard: {
    width: "100%", // Full width when "See All" is clicked
  },
  dateContainer: {
    backgroundColor: "#8C78F0",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  dateText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  activityDetails: {
    marginTop: 10,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  activityLink: {
    fontSize: 12,
    color: "#8C78F0",
    marginVertical: 5,
  },
  activityFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  activityTime: {
    fontSize: 12,
    color: "#555",
  },
  activityStatus: {
    fontSize: 12,
    fontWeight: "bold",
  },
  horizontalCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginRight: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: 250,
  },
  fileDetails: {
    flex: 1,
    marginLeft: 10,
  },
  fileTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  fileDate: {
    fontSize: 14,
    color: "#555",
  },
});

export default Resources;