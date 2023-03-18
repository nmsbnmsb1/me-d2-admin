<template>
	<el-dropdown size="small" class="d2-mr">
		<span class="btn-text">{{ user.username }}({{ role.id | role_name }})</span>
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
import { Constants } from '@/constants';
export default {
	computed: {
		...mapState('user', ['user', 'role']),
		//
		// showname() {
		// 	return `${this.user.username || '未登录'} (${Constants.Roles[this.role.id]?.name || ''})`;
		// },
	},
	methods: {
		...mapActions('user', ['logout']),
		//
		onProfile() {
			let key = Constants.Roles[this.role.id]?.key;
			if (key) this.$router.push(`/${key}/edit_profile`);
		},
		logOff() {
			this.logout({ confirm: true });
		},
	},
};
</script>
