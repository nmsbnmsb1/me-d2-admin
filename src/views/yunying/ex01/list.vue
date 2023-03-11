<template>
	<d2-container>
		<!-- 筛选框 -->
		<template slot="header">
			<div flex="main:center cross:center">
				<el-form :inline="true" :model="pageParams" ref="searchForm" size="mini" style="margin-bottom: -18px">
					<el-form-item label="标题">
						<el-input v-model="pageParams.title" placeholder="请输入标题" clearable style="width: 120px"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="query"><d2-icon name="search" />查询</el-button>
					</el-form-item>
					<el-form-item>
						<el-button @click="reset"><d2-icon name="refresh" />重置</el-button>
					</el-form-item>
				</el-form>
			</div>
		</template>
		<!-- 数据 -->
		<template>
			<div flex="main:justify cross:center" style="margin-bottom: 4px">
				<!-- <el-button size="mini" type="success" @click="onExportKeit" icon="el-icon-document">导出数据</el-button> -->
				<div />
				<el-button size="mini" type="primary" @click="onAdd" icon="el-icon-plus">添加</el-button>
			</div>
			<el-table v-loading="loading" ref="table" :data="listData" fit stripe class="w-full">
				<el-table-column label="序号" width="50" align="center" type="index" :index="indexMethod"> </el-table-column>

				<el-table-column label="标题" align="center" min-width="140">
					<template slot-scope="scope">
						{{ scope.row.title | len15 }}
					</template>
				</el-table-column>
				<el-table-column label="操作" width="100" align="center">
					<template slot-scope="scope">
						<el-tooltip effect="light" content="查看" placement="top">
							<el-button type="warning" size="mini" plain icon="fa fa-group" circle @click="onView(scope.row)"></el-button>
						</el-tooltip>
					</template>
				</el-table-column>
			</el-table>
			<pagination v-show="total > 0" :total="total" :page.sync="pageParams.page" :limit.sync="pageParams.page_size" @pagination="query('page')" />
		</template>
		<!--  -->
	</d2-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Constants from '@/libs/constants';

export default {
	data() {
		return {
			loading: false,
			pageParams: { ...Constants.default_page_params },
			total: 0,
			listData: [],
		};
	},
	computed: {
		...mapState('user', ['currentRole']),
	},
	mounted() {
		this.query();
	},
	methods: {
		...mapActions('yunying/examples', ['getList']),
		//
		indexMethod(index) {
			return (this.pageParams.page - 1) * this.pageParams.page_size + (index + 1);
		},
		reset() {
			this.pageParams = { ...Constants.default_page_params };
			this.query();
		},
		query() {
			this.loading = true;
			this.getList({ ...this.pageParams })
				.then((pageData) => {
					this.total = pageData.count;
					this.listData = pageData.data;
				})
				.finally(() => (this.loading = false));
		},
		onAdd() {
			this.$router.push({ path: '/yunying/ex01/add' });
		},
		onView() {
			//
		},
	},
};
</script>
