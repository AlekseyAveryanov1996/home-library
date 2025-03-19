import router from '@/router';
import { supabase } from '@/supabase';

function toastVisible(isVisible, timeout = 2000) {
  isVisible.value = true;
  setTimeout(() => {
    isVisible.value = false;
  }, timeout);
}

function goToRoute(route, timeout = 3000) {
  setTimeout(() => {
    router.replace(route);
  }, timeout);
}

async function getUser() {

  let userid;
  let emailUser;

  try {
    const { data, error } = await supabase.auth.getUser();
    userid = data.user.id;
    emailUser = data.user.email;
    return {
      userid,
      emailUser,
    };
  } catch {

  }

}

export default { toastVisible, goToRoute, getUser };
