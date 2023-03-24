import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';

const routes: Readonly<RouteRecordRaw[]> = [];
const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export default router;
