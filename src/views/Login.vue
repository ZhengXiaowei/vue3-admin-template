<template>
  <div class="login-wrap">
    <div class="login-container">
      <p class="title-font title">{{title}}</p>
      <a-form :model="forms"
              v-bind="layout">
        <a-form-item>
          <a-input v-model:value="forms.account"
                   size="large"
                   placeholder="请输入用户名">
            <template #prefix>
              <user-outlined />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input-password v-model:value="forms.passwd"
                            size="large"
                            type="password"
                            placeholder="请输入密码">
            <template #prefix>
              <lock-outlined />
            </template>
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <a-button type="primary"
                    block
                    size="large"
                    shape="round"
                    :loading="loading"
                    @click="onLogin">登录</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from "vue";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";

import useFormLayout from "@/hooks/useFormLayout";
import useApp from "@/hooks/useApp";

import { ActionType, MutationType } from "@/store/modules/app/_type";

const Login = defineComponent({
  name: "Login",
  components: {
    UserOutlined,
    LockOutlined,
  },
  setup() {
    const { router, store } = useApp();
    const formLayout = useFormLayout(0);

    const data = reactive({
      forms: {
        account: "",
        passwd: "",
      },
      title: computed(() => store.getters.pageTitle),
      loading: false,
      layout: formLayout,
    });

    const onLogin = async () => {
      store.commit(MutationType.setUser, {
        token: "xjkhgfapoj",
        uid: 1,
        nickname: "Admin",
      });
      router.replace("/");
    };

    return { ...toRefs(data), onLogin };
  },
});

export default Login;
</script>

<style lang="scss" scoped>
.login-wrap {
  height: 100vh;
  background: url(http://normal-image.xiaovv-web.com/normal/2020-11-13-background.svg)
    #f0f2f5 no-repeat top left / contain;

  .title {
    font-size: 40px;
    text-align: center;
    margin-bottom: 30px;
  }

  .login-container {
    padding-top: 120px;
    margin: auto;
    width: 20vw;
  }
}
</style>