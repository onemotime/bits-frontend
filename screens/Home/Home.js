import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { removeHabit } from '../../redux/userSlice';
import convertTimeStrToSec from '../../utils/convertTimeStrToSec';

import HabitRegister from '../../components/HomeBoard/HabitRegister';
import UserHabit from '../../components/HomeBoard/UserHabit';
import CountDownBtn from '../../components/HomeBoard/CountdownBtn';
import StartCountDownBtn from '../../components/HomeBoard/StartCountDownBtn';
import TopNav from '../../components/shared/TopNav';

const Home = () => {
  const [isHabitSelected, setSelectedHabit] = useState(false);
  const [targetHabit, setTargetHabit] = useState(null);
  const [countDownTime, setCountDownTime] = useState(0);
  const [isStartCountBtnOn, setStartCountBtn] = useState(false);

  const { habits, accessToken } = useSelector(state => state.user);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleDeletePress = (targetIndex) => {
    const deleteInput = {
      accessToken,
      targetIndex
    };

    dispatch(removeHabit(deleteInput));
  };

  const handleIconPress = (targetIndex) => {
    const habitType = habits[targetIndex];
    const sec = convertTimeStrToSec(habits[targetIndex].settedTime);

    setSelectedHabit((prev) => {
      if (prev === false) {
        setCountDownTime(sec);
        setTargetHabit(habitType);

        return !prev
      }

      setCountDownTime(0);
      setTargetHabit(null);

      return !prev;
    });
  };

  const handleRegisterHabitPress = () => {
    navigation.navigate('Register');
  };

  const handleStartCountDownPress = () => {
    if (!targetHabit?.habitType || !isHabitSelected) return;

    setSelectedHabit(false);
    setStartCountBtn(true);
  };

  return (
    <View style={styles.wrapper}>
      <TopNav />
        {!isStartCountBtnOn &&
          (habits?.length > 0
            ? <UserHabit
                habits={habits}
                onAddPress={handleRegisterHabitPress}
                onIconPress={(index) => handleIconPress(index)}
                onDeletePress={(index) => handleDeletePress(index)}
                isHabitSelected={isHabitSelected}
                targetHabit={targetHabit}
              />
            : <HabitRegister onAddPress={handleRegisterHabitPress} />)}
        {isStartCountBtnOn
          ? <CountDownBtn
              totalTime={countDownTime}
              setStartCountBtn={setStartCountBtn}
              habitType={targetHabit.habitType}
              accessToken={accessToken}
            />
          : <StartCountDownBtn onAddPress={handleStartCountDownPress} />}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#F9BC56'
  }
});

export default Home;
