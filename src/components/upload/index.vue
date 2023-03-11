<template>
	<div class="form-upload">
		<el-upload
			ref="up"
			action="#"
			list-type="picture-card"
			:auto-upload="false"
			:limit="limit"
			:class="[
				disabled && filelist.length > 0 ? 'is-disabled' : '',
				disabled && filelist.length <= 0 ? 'is-disabled-empty' : '',
				filelist.length >= limit ? 'is-exceed' : '',
			]"
			:file-list="filelist"
			:on-change="onChange"
			:on-exceed="onExceed"
			:http-request="doUpload"
		>
			<i slot="default" class="el-icon-plus" />
			<div slot="file" slot-scope="{ file }" class="w-full h-full">
				<img v-if="isImg(file)" class="el-upload-list__item-thumbnail" :src="getUrl(file)" />
				<div v-else class="w-full h-full" flex="main:center cross:center">
					<i class="el-icon-document text-3xl opacity-50" />
				</div>
				<!-- -->
				<!-- <template v-if="file.status === 'ready'">
					<span class="el-upload-list__item-actions" style="opacity: 1; font-size: 12px"> <i class="el-icon-upload"></i>&nbsp;&nbsp;等待上传 </span>
				</template> -->
				<template v-if="file.status === 'uploading'">
					<span class="el-upload-list__item-actions" style="opacity: 1; font-size: 12px">
						<i class="el-icon-loading" />&nbsp;&nbsp;上传中({{ file.percentage }}%)
					</span>
				</template>
				<template v-else-if="file.status === 'error'">
					<span class="el-upload-list__item-actions" style="opacity: 1; font-size: 12px" @click="onReset(file)">
						<i class="el-icon-refresh-left" />&nbsp;&nbsp;上传出错
					</span>
				</template>
				<template v-else>
					<span v-if="uploadMode === 'manual' && file.status === 'ready'" class="el-upload-list__item-actions" style="opacity: 0.8; font-size: 12px">
						<i class="el-icon-upload" />&nbsp;&nbsp;待上传
					</span>
					<span class="el-upload-list__item-actions">
						<span v-if="isImg(file)" class="el-upload-list__item-preview" @click="onPictureCardPreview(file)">
							<i class="el-icon-zoom-in" />
						</span>
						<span class="el-upload-list__item-delete" @click="onDownload(file)">
							<i class="el-icon-download" />
						</span>
						<span v-if="!disabled" class="el-upload-list__item-delete" @click="onRemove(file)">
							<i class="el-icon-delete" />
						</span>
					</span>
				</template>
			</div>
			<div v-if="tip" class="el-upload__tip" slot="tip">
				<el-button v-if="uploadMode === 'manual'" size="small" @click="upload" :disabled="filelist.length <= 0" icon="el-icon-upload2" type="success"
					>立即上传</el-button
				>
				<span class="form-tip">{{ tip }}</span>
			</div>
		</el-upload>
		<!--预览对话框-->
		<el-dialog :visible.sync="dialogVisible" :append-to-body="true">
			<img width="100%" :src="dialogImageUrl" alt="" />
		</el-dialog>
	</div>
</template>

<script>
import Vue from 'vue';
import Constants from '@/libs/constants';

export default {
	props: {
		disabled: { type: Boolean, default: false },
		tip: { type: String },
		uploadMode: { type: String, default: 'manual' }, //manual/slient/auto
		//
		domain: { type: String, default: Constants.CDN },
		dirname: { default: '' },
		fileName: { type: String },
		bucket: { type: Object, default: () => Constants.Buckets.default },
		//
		limit: { type: Number, default: 1 },
		fileTypes: { type: Array },
		fileSizeKb: { type: Number, default: 0 }, //kb
		fileSizeMb: { type: Number, default: 0 }, //mb
		//
		files: { type: Array, required: true },
	},
	watch: {
		files: {
			immediate: true,
			handler: function (newVal, oldVal) {
				let n = JSON.stringify(newVal);
				let o = JSON.stringify(this.ifiles);
				if (n !== o) {
					this.ifiles = JSON.parse(n);
					this.filelist = [];
					for (let f of this.ifiles) {
						if (!f.name) f.name = f.url.substring(f.url.lastIndexOf('/') + 1);
						this.filelist.push({ ...f });
					}
				}
			},
		},
	},
	data() {
		return {
			dialogVisible: false,
			dialogImageUrl: '',
			//作为输出的值
			ifiles: [],
			//实际存储file对象的列表
			filelist: [],
			//上传队列
			queue: [],
		};
	},
	methods: {
		isImg(file) {
			if (file.type) return file.type.startsWith('image/');
			if (file.url) {
				let ext = file.url.substring(file.url.lastIndexOf('.')).toLowerCase();
				return ext === '.jpg' || ext === '.jpeg' || ext === '.gif' || ext === '.png';
			}
			return false;
		},
		getUrl(file) {
			if (file.blob) return file.blob;
			if (file.url) return `${this.domain}/${this.dirname ? `${this.dirname}/` : ''}${file.url}`;
			return '';
		},
		onChange(file, filelist) {
			// 查重
			{
				let index = -1;
				for (let i = 0; i < filelist.length; i++) {
					if (file !== filelist[i] && file.name === filelist[i].name) {
						index = i;
						break;
					}
				}
				if (index >= 0) {
					filelist.splice(index, 1);
					this.$message({ type: 'error', message: '已上传相同的文件' });
					return;
				}
			}
			// 查类型
			let index = filelist.indexOf(file);
			if (this.fileTypes) {
				let matched = false;
				let type = file.raw.type;
				for (let t of this.fileTypes) {
					if (type.match(t)) {
						matched = true;
						break;
					}
				}
				if (!matched) {
					filelist.splice(index, 1);
					this.$message({ type: 'error', message: '文件类型不匹配' });
					return;
				}
			}
			//查文件大小
			if (this.fileSizeKb > 0 && file.raw.size / 1024 > this.fileSizeKb) {
				filelist.splice(index, 1);
				this.$message({ type: 'error', message: `超出文件大小限制,当前 ${(file.raw.size / 1024).toFixed(2)} kb, 最大 ${this.fileSizeKb} kb` });
				return;
			}
			if (this.fileSizeMb > 0 && file.raw.size / 1024 / 1024 > this.fileSizeMb) {
				filelist.splice(index, 1);
				this.$message({ type: 'error', message: `超出文件大小限制,当前 ${(file.raw.size / 1024 / 1024).toFixed(2)} mb, 最大 ${this.fileSizeMb} mb` });
				return;
			}
			//
			file.blob = file.url;
			file.url = file.name;
			file.type = file.raw.type;
			file.status = 'ready';
			this.filelist.push(file);
			this.ifiles.push({ url: file.url, name: file.name, type: file.raw.type });
			this.$emit('update:files', this.ifiles.slice());
		},
		onRemove(file) {
			for (let i = 0; i < this.filelist.length; i++) {
				if (file.url === this.filelist[i].url) {
					this.filelist.splice(i, 1);
					break;
				}
			}
			for (let i = 0; i < this.ifiles.length; i++) {
				if (file.url === this.ifiles[i].url) {
					this.ifiles.splice(i, 1);
					this.$emit('update:files', this.ifiles.slice());
					break;
				}
			}
		},
		onPictureCardPreview(file) {
			this.dialogImageUrl = this.getUrl(file);
			this.dialogVisible = true;
		},
		onDownload(file) {
			window.open(this.getUrl(file), '_blank');
		},
		onExceed() {
			this.$message({ type: 'error', message: `最多上传${this.limit}个文件` });
		},
		onReset(file) {
			file.status = 'ready';
			this.doUpload({ file });
		},
		//
		upload() {
			this.queue = [];
			//重置状态
			for (let f of this.filelist) {
				if (f.status === 'error') f.status = 'ready';
			}
			this.$refs.up.submit();
			//
			return Promise.all(this.queue);
		},
		doUpload(param) {
			let p = {};
			p.p = new Promise((resolve, reject) => {
				p.resolve = resolve;
				p.reject = reject;
			});
			this.queue.push(p.p);
			//
			let file;
			for (let f of this.filelist) {
				if (f.name === param.file.name) {
					file = f;
					break;
				}
			}
			if (!file) {
				Vue.set(file, 'status', 'error');
				p.reject('error');
				return;
			}
			//
			Vue.set(file, 'status', 'uploading');
			Vue.set(file, 'percentage', 1);
			this.$store
				.dispatch('user/upload', {
					bucket: this.bucket,
					filename: `${this.dirname ? `${this.dirname}/` : ''}${file.url}`,
					body: param.file,
					onProgress: (progressData) => Vue.set(file, 'percentage', parseInt(progressData.percent * 100)),
				})
				.then(() => {
					Vue.set(file, 'status', 'success');
					p.resolve(true);
				})
				.catch((err) => {
					Vue.set(file, 'status', 'error');
					p.reject(err);
				});
			// this.getUploadKey().then((uploadKey) => {
			// 	new COS({ SecretId: uploadKey.secretID, SecretKey: uploadKey.secretKey, SecurityToken: uploadKey.token }).putObject(
			// 		{
			// 			Bucket: this.bucket.bucket,
			// 			Region: this.bucket.region,
			// 			Key: `${this.dirname ? `${this.dirname}/` : ''}${file.url}`,
			// 			Body: param.file,
			// 			ProgressInterval: 10,
			// 			onProgress: (progressData) => Vue.set(file, 'percentage', parseInt(progressData.percent * 100)),
			// 		},
			// 		(err, data) => {
			// 			if (!err) {
			// 				Vue.set(file, 'status', 'success');
			// 				p.resolve(true);
			// 			} else {
			// 				Vue.set(file, 'status', 'error');
			// 				p.reject('error');
			// 			}
			// 		}
			// 	);
			// });
		},
	},
};
</script>

<style>
.form-upload {
	& .el-upload-list__item {
		margin-bottom: 0;
	}
	& .el-upload--picture-card,
	.el-upload-list__item {
		width: 148px;
		height: 148px;
		line-height: 148px;
	}
	& .el-upload__tip {
		margin-top: 0px;
		& .el-button {
			width: 148px;
			margin-right: 8px;
		}
	}

	/* & .xs {
		& .el-upload--picture-card,
		.el-upload-list__item {
			width: 48px;
			height: 48px;
			line-height: 48px;
		}

		& .el-upload__tip {
			& .el-button {
				width: 48px;
				& span {
					display: none;
				}
			}
		}
	}
	& .mini {
		& .el-upload--picture-card,
		.el-upload-list__item {
			width: 64px;
			height: 64px;
			line-height: 64px;
		}
		& .el-upload__tip {
			& .el-button {
				width: 64px;
				& span {
					display: none;
				}
			}
		}
	}
	& .small {
		& .el-upload--picture-card,
		.el-upload-list__item {
			width: 100px;
			height: 100px;
			line-height: 100px;
		}
		& .el-upload__tip {
			& .el-button {
				width: 100px;
			}
		}
	} */

	& .is-exceed > .el-upload.el-upload--picture-card,
	& .is-disabled > .el-upload.el-upload--picture-card {
		display: none;
	}
	& .is-disabled-empty > .el-upload.el-upload--picture-card {
		border: 1px dashed #c0ccda;
		cursor: not-allowed;
		pointer-events: none;
	}

	/* & .is-sm .el-upload-list__item-actions {
		opacity: 100 !important;
		background-color: transparent;
	}
	& .is-sm .el-upload-list__item-preview {
		display: inline;
	}
	& .is-sm .el-upload-list__item-delete {
		display: none !important;
	}
	& .val-changed .is-disabled li {
		outline: 2px solid #ff063f !important;
	} */
}
</style>
