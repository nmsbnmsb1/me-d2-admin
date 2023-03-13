<template>
	<d2-container>
		<div class="mt-15px" flex="dir:top main:center cross:center">
			<el-form :model="profile" :label-width="`100px`" ref="dataBase">
				<el-form-item label="当前帐号:" prop="phone" class="input">
					<span>{{ user.m_phone }}</span>
				</el-form-item>
				<el-form-item label="真实姓名:" prop="realname" class="input">
					<span>{{ user.m_realname }}</span>
				</el-form-item>

				<el-form-item label="简介:" prop="intro" class="input">
					<el-input type="textarea" v-model="profile.intro" maxlength="256" show-word-limit placeholder="请输入简介"></el-input>
				</el-form-item>
				<el-form-item label="详情" prop="description_rich" class="w-full">
					<d2-quill style="min-height: 200px; margin-bottom: 10px" :ref="1" v-model="profile.description_rich" />
					<div class="form-tip">详情不限字符，支持图文形式</div>
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
				<el-form-item label="签名:" prop="sign_imgs" class="upload">
					<upload
						ref="sign_imgs"
						:dirname="dirname"
						:files.sync="profile.sign_imgs"
						uploadMode="slient"
						:fileTypes="['image/*']"
						:fileSizeKb="300"
						tip="建议尺寸40*60，上传格式为jpg、png，白底黑字；签名将在：导师评语、结题报告出应用，请保证签名的美观和清晰"
					/>
				</el-form-item>
			</el-form>
			<div class="footer">
				<el-button-group>
					<el-button type="success" @click="onSubmit">确认修改</el-button>
					<el-button @click="$router.go(-1)">关闭</el-button>
				</el-button-group>
			</div>
		</div>
	</d2-container>
</template>

<script>
import Vue from 'vue';
import md5 from 'js-md5';
import { mapState, mapActions } from 'vuex';

export default {
	data() {
		return {
			currentProfile: {},
			//
			dirname: '',
			profile: { intro: '', description_rich: '', photoes: [], sign_imgs: [] },
		};
	},
	computed: {
		...mapState('user', ['user', 'currentRole']),
	},
	async mounted() {
		this.currentProfile = await this.getAllProfile();
		//
		this.profile = { ...this.currentProfile };
		if (this.profile.description_rich) {
			this.getDaoshiDescriptionRich(this.profile.description_rich).then((data) => {
				Vue.set(this.profile, 'description_rich', data);
			});
		}
		this.profile.photoes = [];
		if (this.profile.photo) this.profile.photoes = [{ url: this.profile.photo, type: 'image/*' }];
		this.profile.sign_imgs = [];
		if (this.profile.sign_img) this.profile.sign_imgs = [{ url: this.profile.sign_img, type: 'image/*' }];
	},
	methods: {
		...mapActions('cms', ['getDaoshiDescriptionRich']),
		...mapActions('daoshi/profile', ['getAllProfile', 'updateProfile', 'setDaoshiDescriptionRich']),
		//
		async onSubmit() {
			let profile = { ...this.profile };
			profile.intro = this.profile.intro || 'null';
			profile.description_rich = this.profile.description_rich ? md5(this.profile.description_rich) : 'null';
			if (profile.photoes[0]?.url) {
				let url = profile.photoes[0].url;
				if (url.startsWith('profile_daoshi/')) url = url.substring(url.lastIndexOf('/') + 1);
				profile.photo = url;
			} else {
				profile.photo = 'null';
			}
			if (profile.sign_imgs[0]?.url) {
				let url = profile.sign_imgs[0].url;
				if (url.startsWith('profile_daoshi/')) url = url.substring(url.lastIndexOf('/') + 1);
				profile.sign_img = url;
			} else {
				profile.sign_img = 'null';
			}
			delete profile.photoes;
			delete profile.sign_imgs;
			// console.log(profile);
			// return;
			//
			let loading = this.$loading({ lock: true, text: '正在提交', spinner: 'el-icon-loading', background: 'rgba(0, 0, 0, 0.7)' });
			try {
				profile = await this.updateProfile(profile);
			} catch (e) {
				this.loading = false;
				return;
			}
			//
			if (profile.description_rich && profile.description_rich !== this.currentProfile.description_rich) {
				try {
					await this.setDaoshiDescriptionRich({ description_rich: profile.description_rich, content: this.profile.description_rich });
				} catch (e) {
					//管他成不成功，反正还可以改
					//this.$message.error('课题封面上传出错，请稍后重试');
				}
			}
			//console.log(profile.photo, this.currentProfile.photo);
			if (profile.photo && profile.photo !== this.currentProfile.photo) {
				this.dirname = profile.photo.substring(0, profile.photo.lastIndexOf('/'));
				console.log(this.dirname);
				try {
					await this.$refs.photoes.upload();
				} catch (e) {}
			}
			if (profile.sign_img && profile.sign_img !== this.currentProfile.sign_img) {
				this.dirname = profile.sign_img.substring(0, profile.sign_img.lastIndexOf('/'));
				try {
					await this.$refs.sign_imgs.upload();
				} catch (e) {}
			}
			//
			this.$message.success('资料已更新！');
			loading.close();
		},
	},
};
</script>
