import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { defineStore } from 'pinia';
import { localStg } from '@/utils';
import { useRouteStore } from '../route';
import { useTabStore } from '../tab';
import AuthAPI from '@/api/auth';
import {jwtDecode} from 'jwt-decode';
import type { UserInfo } from './typings';

export const useAuthStore = defineStore('auth-store', () => {
  const router = useRouter();
  const route = useRoute();
  const routeStore = useRouteStore();
  const tabStore = useTabStore();

  const token = ref(localStg.get('token'));
  const userInfo = ref(localStg.get('userInfo'));
  const loginLoading = ref(false);

  const reset = (timeout = 0) => {
    localStg.remove('token');
    localStg.remove('userInfo');
    setTimeout(() => {
      token.value = localStg.get('token');
      userInfo.value = localStg.get('userInfo');
    }, timeout);
  };

  const decodeToken = (token: string) => {
    const decodedToken = jwtDecode<UserInfo>(token);
    localStg.set('userInfo', decodedToken);
    userInfo.value = decodedToken;
  };

  const login = async (userName: string, password: string) => {
    loginLoading.value = true;
    try {
      const response = await AuthAPI.login({ username: userName, password });
      const { accessToken, refreshToken, expiresIn } = response.data.data.authorization;
      localStg.set('token', accessToken);
      token.value = accessToken;

      decodeToken(accessToken);

      await routeStore.init();
      loginLoading.value = false;
      window.$notification.success({
        title: $translate('login.loginSuccess'),
        content: $translate('login.welcomeBack', {
          userName: userInfo.value?.username,
        }),
        duration: 3000,
      });
      router.push(route.query.redirect ? (route.query.redirect as string) : { name: 'Root' });
    } catch (e) {
      console.warn(e);
      loginLoading.value = false;
      reset();
    }
  };

  const logout = async () => {
    await AuthAPI.logout();
    const redirect = route.fullPath;
    reset(500);
    setTimeout(() => {
      routeStore.reset();
      tabStore.reset();
    }, 500);
    router.push({ name: 'Login', query: { redirect } });
  };

  const refreshToken = async () => {
    try {
      const response = await AuthAPI.refreshToken(token.value!);
      const { accessToken, refreshToken, expiresIn } = response.data.data.authorization;
      localStg.set('token', accessToken);
      token.value = accessToken;

      decodeToken(accessToken);
    } catch (e) {
      console.warn(e);
      reset();
    }
  };

  return {
    userInfo,
    loginLoading,
    reset,
    login,
    logout,
    refreshToken,
  };
});