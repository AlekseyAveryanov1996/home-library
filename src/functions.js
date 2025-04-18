import router from '@/router';

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

export default { toastVisible, goToRoute };
