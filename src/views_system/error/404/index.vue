<template>
	<div class="page">
		<p class="page_title">404 page not found</p>
		<el-button class="d2-mt" @click="$router.replace({ path: index })">返回首页</el-button>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import { Constants } from '@/constants';

export default {
	computed: {
		...mapState('user', ['role']),
		//
		index() {
			return Constants.Roles[this.role.role_id] ? `/${Constants.Roles[this.role.role_id].key}` : '/';
		},
	},
};
</script>

<style lang="scss" scoped>
.page {
	background: #303133;
	background-blend-mode: multiply, multiply;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	.page_title {
		font-size: 20px;
		color: #fff;
	}
}
</style>
