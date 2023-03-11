<template>
	<d2-container>
		<div class="mt-15px" flex="dir:top main:center cross:center">
			<el-form :model="profile" :label-width="`100px`" ref="dataBase">
				<el-form-item label="当前帐号:" prop="phone" class="input">
					<span>{{ user.username }}</span>
				</el-form-item>
				<el-form-item label="简介" prop="intro" class="w-full">
					<d2-quill style="min-height: 200px; margin-bottom: 10px" :ref="1" v-model="profile.intro" />
				</el-form-item>

				<el-form-item label="照片:" prop="photoes" class="upload">
					<upload
						ref="photoes"
						:dirname="dirname"
						:files.sync="profile.photoes"
						uploadMode="slient"
						:fileTypes="['image/*']"
						:fileSizeKb="300"
						tip="建议尺寸：240*320px，最多上传1张，大小300kb以内"
					/>
				</el-form-item>
			</el-form>
			<div class="footer">
				<el-button-group>
					<el-button type="success" @click="onSubmit" style="margin-right: 10px">确认修改</el-button>
					<el-button @click="$router.go(-1)">关闭</el-button>
				</el-button-group>
			</div>
		</div>
	</d2-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
	data() {
		return {
			currentProfile: {},
			dirname: '',
			profile: { intro: '', photoes: [] },
		};
	},
	computed: {
		...mapState('user', ['user', 'currentRole']),
	},
	async mounted() {
		this.currentProfile = {};
		this.profile = { ...this.currentProfile };
		this.profile.photoes = [];
		if (this.profile.photo) this.profile.photoes = [{ url: this.profile.photo, type: 'image/*' }];
	},
	methods: {
		async onSubmit() {
			let profile = { ...this.profile };
			profile.intro = this.profile.intro || 'null';
			profile.intro = profile.photoes[0]?.url ? profile.photoes[0].url : 'null';
			delete profile.photoes;
			// console.log(profile);
			// return;
			//
			//上传示例
			// let loading = this.$loading({ lock: true, text: '正在提交', spinner: 'el-icon-loading', background: 'rgba(0, 0, 0, 0.7)' });
			// try {
			// 	//上传至cdn
			// 	profile = await this.updateProfile(profile);
			// } catch (e) {
			// 	this.loading = false;
			// 	return;
			// }
			// //console.log(profile.photo, this.currentProfile.photo);
			// if (profile.photo && profile.photo !== this.currentProfile.photo) {
			// 	this.dirname = profile.photo.substring(0, profile.photo.lastIndexOf('/'));
			// 	//console.log(this.dirname);
			// 	try {
			// 		await this.$refs.photoes.upload();
			// 	} catch (e) {}
			// }
			// //
			// this.$message.success('资料已更新！');
			// loading.close();
		},
	},
};
</script>
