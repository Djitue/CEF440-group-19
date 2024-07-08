import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import WelcomePage from "./screen/WelcomePage";
import AdminDashboard from "./components/admin/AdminDashboard";
import Registration_list from "./components/admin/Registration_list";
import Reg_fingerPrint from "./components/admin/Reg_fingerPrint";
import RootSatck from "./navigator/RootSatck";
import AdminRoot from "./components/admin/AdminRoot";
import EditTest from "./components/admin/manage_lecturers/EditTest";


import Lecturer_Dashboard from "./components/lecturers/Lecturer_Dashboard";
import LoginAs from "./screen/LoginAs";
import WelocomeGuide from "./screen/WelocomeGuide";
import Login from "./screen/Login";
import SignUp from "./screen/SignUp";
import SINGNUPs from "./screen/SINGNUPs";

import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getRole } from "./firebase/auth";
import LecturerMgmnt from "./components/admin/manage_lecturers/LecturerMgmnt";
import Lect_fingerprint from "./components/admin/manage_lecturers/Lect_fingerprint";

import Signup00 from "./screen/Signup00";
import Tracking_attendance from "./components/lecturers/Tracking_attendance";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";









export default function App() {
  return (
    < RootSatck />
    // <WelcomePage />

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f6f9ff",
  },
});
