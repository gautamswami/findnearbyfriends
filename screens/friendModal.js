import axios from "axios";
import React, { useEffect, useState } from "react";
import { Text, View, Pressable, Modal, ScrollView } from "react-native";
import styles from "./css";
import { Ionicons } from "@expo/vector-icons";

export default function FriendModal({ user,friendmodal, setFriendmodal }) {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [folloreq, setFolloreq] = useState([]);
  const [userdetail, setUserDetail] = useState([]);
  const [loading,setLoading] = useState()
  const handleAccept = async (followername) => {
    setLoading(true);
    let userdata = await axios.post(
      "https://fnfservice.onrender.com/user/acceptfollow",
      {
        username: user,
        followername: followername,
      }
    );
    if (userdata) {
      handleGet();
      setLoading(false);
      
    }
  };
  const deleteFollowrequest = async (followername) => {
    let userdata = await axios.post(
      "https://fnfservice.onrender.com/user/deletefollower",
      {
        username: user,
        followername: followername,
      }
    );
  };
  const unFollow = async (followername) => {
    let userdata = await axios.post(
      "https://fnfservice.onrender.com/user/deletefollowing",
      {
        username: user,
        followername: followername,
      }
    );
    if (userdata?.data?.acknowledged) {
      handleGet();
    }
  };
  const deleteFollower = async (followername) => {
    let userdata = await axios.post(
      "https://fnfservice.onrender.com/user/deletefollower",
      {
        username: user,
        followername: followername,
      }
    );
    if (userdata?.data?.acknowledged) {
      handleGet();
    }
  };
  const handleGet = async () => {
    let userFollowers = await axios.post(
      "https://fnfservice.onrender.com/user/getuser",
      {
        username: user,
      }
    );
    setUserDetail(userFollowers?.data[0], "rest");
    setFollowers(userFollowers?.data[0].followers);
    setFollowing(userFollowers?.data[0].following);
    setFolloreq(userFollowers?.data[0].tofollowyourequest);
  };
  useEffect(() => {
    handleGet();
  }, []);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={friendmodal}
        onRequestClose={() => {
          setFriendmodal(!friendmodal);
        }}
      >
        <ScrollView style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={[styles.flexfar, { width: "100%" }]}>
              <Text style={styles.blacksmalltext}>Followers</Text>
              <Pressable onPress={() => setFriendmodal(!friendmodal)}>
                <Ionicons name="close" size={24} />
              </Pressable>
            </View>
            <Text style={styles.modalreq}>{folloreq?.length} New requests</Text>
          {!loading && <View>
            {folloreq?.map((data, id) => {
              return (
                <View key={`request-${id}`} style={styles.flexfar}>
                  <Text>{data}</Text>
                  <Pressable
                    onPress={() => handleAccept(data)}
                    style={styles.approveBtn}
                  >
                    <Text style={styles.textStyle}>APPROVE</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => deleteFollowrequest(data)}
                    style={styles.declineBtn}
                  >
                    <Text>DECLINE</Text>
                  </Pressable>
                </View>
              );
            })}</View>
          }
            <Text style={styles.modalreq}>
              {userdetail?.followers?.length} Followers
            </Text>
            {followers?.map((data, id) => {
              return (
                <View key={`follower-${id}`} style={styles.flexfar}>
                  <Text>{data}</Text>
                  <Pressable
                    onPress={() => deleteFollower(data)}
                    style={styles.declineBtn}
                  >
                    <Text>Remove</Text>
                  </Pressable>
                </View>
              );
            })}

            <Text style={styles.modalreq}>
              {userdetail?.following?.length} Following
            </Text>
            {following?.map((data, id) => {
              return (
                <View key={`following-${id}`} style={styles.flexfar}>
                  <Text>{data}</Text>
                  <Pressable
                    onPress={() => unFollow(data)}
                    style={styles.approveBtn}
                  >
                    <Text style={styles.textStyle}>Unfollow</Text>
                  </Pressable>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
}
