<template>
	<d2-container>
		<!-- 筛选框 -->
		<template slot="header"> </template>
		<!-- 数据 -->
		<template> </template>
	</d2-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
	components: {},
	data() {
		return {
			//列表
			loading: false,
		};
	},
	computed: {
		...mapState('user', ['currentRole']),
	},
	mounted() {},
	methods: {},
};
</script>
