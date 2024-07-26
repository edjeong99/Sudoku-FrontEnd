// confige file for multi language support

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        "Welcome": "Welcome",
        "Menu":"Menu",
        "Easy":"Easy",
        "Medium":"Medium",
        "Hard":"Hard",
        "Sign In":"Sign In",
        "Email":"Email",
        "Password":"Password",
        "Nick Name":"Nick Name",
        "Sign Up":"Sign Up",
        "Need an account":"Need an account? Sign Up",
        "Already have" : "Already have an account? Sign In",
        "Log Out":"Log Out",
      },
      
    },
    ko: {
      translation: {
        "Welcome": "환영합니다",
        "Menu":"메뉴",
        "Easy":"쉬움",
        "Medium":"중간",
        "Hard":"어려움",
        "Sign In":"로그인",
        "Email":"이메일 주소",
        "Password":"비밀번호",
        "Nick Name":"별명",
        "Sign Up":"가입",
        "Need an account":"계정이 없으세요? 가입하세요",
        "Already have" : "계정이 있으세요? 로그인하세요",

        "Log Out":"로그아웃",
      }
    }
  },
  lng: "en", // default language
  fallbackLng: "en",

  interpolation: {
    escapeValue: false // react already safes from xss
  }
});

export default i18n;
