import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSignin } from '../../redux/userSlice';
import { View,  TouchableOpacity } from 'react-native';
import { SIZES } from '../../constants/index';
import checkInputStatus from '../../utils/checkInputStatus';
import { NAMES } from '../../constants/index';

import Loading from '../Animations/Loading/Loading';
import LogoName from '../../components/shared/LogoName/LogoName';
import LoginInput from '../../components/LoginBoard/LoginInput/LoginInput';
import LoginButtons from '../../components/LoginBoard/LoginButtons/LoginButtons';
import LoginModal from '../../components/ReusableModal/ReusableModal';

import {
  GoogleIcon,
  FacebookIcon,
  InstagramIcon
} from '../../assets/svgs/icon';

import styles from './styles';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isModalShown, setModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isLoginFailed, setLoginFailStatus] = useState(false);

  const { isFetching, pushToken, isError } = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      setModal(true);
      setModalMessage('입력 정보를 다시 확인해주세요')
      setLoginFailStatus(true);
    }
  }, [isError]);

  const handleLoginPress = () => {
    const isInputImproper = checkInputStatus(
      'login',
      email,
      password,
      null,
      null,
      setModalMessage,
      setModal
    );

    if (isInputImproper) return;

    const loginInput = {
      email,
      password,
      pushToken
    };

    dispatch(fetchSignin(loginInput));
  };

  const handleSingupPress = () => {
    navigation.navigate(NAMES.SIGNUP);
  };

  const handleModalPress = () => {
    setLoginFailStatus(false);
    setModalMessage('');
    setModal(false);
  };

  return (
    <>
      {isLoginFailed &&
        <LoginModal
          message={modalMessage}
          visible={isModalShown}
          onButtonPress={handleModalPress}
        />}
      {isModalShown &&
        <LoginModal
          message={modalMessage}
          visible={isModalShown}
          onButtonPress={handleModalPress}
        />}
      {isFetching
        ? <Loading />
        : <View style={styles.wrapper}>
            <View style={styles.loginWrapper}>
              <LogoName />
              <LoginInput
                email={email}
                onEmailChange={setEmail}
                password={password}
                onPasswordChange={setPassword}
              />
              <LoginButtons
                onLoginPress={handleLoginPress}
                onSingupPress={handleSingupPress}
              />
              <View style={styles.iconWrapper}>
                <TouchableOpacity>
                  <GoogleIcon size={SIZES.LOGO_ICON} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <FacebookIcon size={SIZES.LOGO_ICON} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <InstagramIcon size={SIZES.LOGO_ICON} />
                </TouchableOpacity>
              </View>
            </View>
          </View>}
    </>
  );
};

export default Login;
