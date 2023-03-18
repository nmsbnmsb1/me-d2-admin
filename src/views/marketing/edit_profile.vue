<template>
	<d2-container>
		<div class="mt-15px" flex="dir:top main:center cross:center">
			<el-form :model="profile" :label-width="`100px`" ref="dataBase">
				<el-form-item label="当前帐号:" prop="phone" class="input">
					<span>{{ user.username }}</span>
				</el-form-item>

				<el-form-item label="详情" prop="intro" class="w-full">
					<d2-quill style="min-height: 200px; margin-bottom: 10px" :ref="1" v-model="profile.intro" />
					<div class="form-tip">详情不限字符，支持图文形式</div>
				</el-form-item>

				<el-form-item label="照片:" prop="photoes" class="upload">
					<upload
						ref="photoes"
						uploadMode="slient"
						tip="建议尺寸：240*320px，最多上传1张，大小300kb以内"
						:files.sync="profile.photoes"
						:fileTypes="['image/*']"
						:fileSizeKb="300"
						:fileURLModifier="(url) => `profile/${url}`"
					/>
				</el-form-item>
			</el-form>
			<div class="footer">
				<el-button-group>
					<!-- <el-button type="success" @click="onSubmit" style="margin-right: 10px">确认修改</el-button> -->
				</el-button-group>
			</div>
		</div>
	</d2-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
	data() {
		return {
			profile: { intro: '', photoes: [] },
		};
	},
	computed: {
		...mapState('user', ['user', 'role']),
	},
	async mounted() {
		this.profile = {};
		this.profile.photoes = [];
		if (this.profile.photo) this.profile.photoes = [{ url: this.profile.photo, type: 'image/*' }];
	},
	methods: {
		...mapActions('user', ['upload']),
		//
		async onSubmit() {
			let profile = { ...this.profile };
			profile.intro = this.profile.intro || 'null';
			if (profile.photoes[0]?.url) {
				profile.photo = profile.photoes[0].url;
			} else {
				profile.photo = 'null';
			}
			delete profile.photoes;
			// console.log(profile);
			// return;
			//
			let loading = this.$loading({ lock: true, text: '正在提交', spinner: 'el-icon-loading', background: 'rgba(0, 0, 0, 0.7)' });
			try {
				profile = await this.upload(profile);
			} catch (e) {
				this.loading = false;
				return;
			}
			//console.log(profile.photo, this.currentProfile.photo);
			//this.dirname = profile.photo.substring(0, profile.photo.lastIndexOf('/'));
			try {
				await this.$refs.photoes.upload();
			} catch (e) {}
			//
			this.$message.success('资料已更新！');
			loading.close();
		},
	},
};
</script>
