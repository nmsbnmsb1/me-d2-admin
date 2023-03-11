<template>
	<el-dropdown size="small" class="d2-mr">
		<span class="btn-text">{{ showname }}</span>
		<el-dropdown-menu slot="dropdown">
			<el-dropdown-item @click.native="onProfile">
				<d2-icon name="user-circle" class="d2-mr-5" />
				编辑资料
			</el-dropdown-item>
			<el-dropdown-item @click.native="logOff">
				<d2-icon name="power-off" class="d2-mr-5" />
				注销
			</el-dropdown-item>
		</el-dropdown-menu>
	</el-dropdown>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Constants from '@/libs/constants';
export default {
	computed: {
		...mapState('user', ['user', 'currentRole']),
		//
		showname() {
			return `${this.user.nickname || this.user.username || '未登录'} (${Constants.Roles[this.currentRole.id]?.name || ''})`;
		},
	},
	methods: {
		...mapActions('user', ['logout']),
		//
		onProfile() {
			this.$router.push('/profile/edit');
		},
		logOff() {
			this.logout({ confirm: true });
		},
	},
};
</script>
