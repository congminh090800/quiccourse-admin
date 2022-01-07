<template>
  <div id="class-detail-page">
    <a-breadcrumb style="margin-bottom: 20px">
      <a-breadcrumb-item>
        <a-icon type="home" />
      </a-breadcrumb-item>
      <a-breadcrumb-item
        ><router-link to="/class">{{
          $t("BREADCRUMB_CLASS_LIST")
        }}</router-link></a-breadcrumb-item
      >
      <a-breadcrumb-item
        ><router-link :to="`/class/detail/${id}`">{{
          $t("BREADCRUMB_CLASS_DETAIL")
        }}</router-link></a-breadcrumb-item
      >
    </a-breadcrumb>
    <a-spin :spinning="loading">
      <a-card v-if="data" :title="$t('CLASS_DETAIL_TITLE')">
        <div class="detail-item">
          {{ $t("CLASS_DETAIL_ID") }}: {{ data._id }}
        </div>
        <div class="detail-item">
          {{ $t("CLASS_DETAIL_NAME") }}: {{ data.name }}
        </div>
        <div class="detail-item">
          {{ $t("CLASS_DETAIL_SECTION") }}: {{ data.section }}
        </div>
        <div class="detail-item">
          {{ $t("CLASS_DETAIL_SUBJECT") }}: {{ data.subject }}
        </div>
        <div class="detail-item">
          {{ $t("CLASS_DETAIL_ROOM") }}: {{ data.room }}
        </div>
        <div class="detail-item">
          {{ $t("CLASS_DETAIL_CODE") }}: {{ data.code }}
        </div>
        <div class="detail-item">
          {{ $t("CLASS_DETAIL_OWNER") }}:
          <router-link :to="`/user/detail/${data.owner._id}`"
            >{{ data.owner.name }} <a-icon type="export"
          /></router-link>
        </div>
        <div class="detail-item">
          {{ $t("CLASS_DETAIL_CREATED_AT") }}: {{ data.createdAt }}
        </div>
        <div class="detail-item">
          {{ $t("CLASS_DETAIL_IS_DELETED") }} :
          <span>
            <a-switch
              checked-children="TRUE"
              un-checked-children="FALSE"
              :checked="data.deleted_flag"
              @change="handleTeacherTableChange"
              disabled
            ></a-switch
          ></span>
        </div>
        <div class="detail-item">{{ $t("CLASS_DETAIL_TEACHERS") }}:</div>
        <a-table
          style="padding: 8px"
          :columns="userColumns"
          :row-key="(record) => record._id"
          :data-source="data.teachers"
          :pagination="teacherPagination"
          :scroll="{ x: true }"
        >
          <template v-for="(val, index) in keyTitles" :slot="`title${index}`">
            <span :key="index">
              {{ $t(val) }}
            </span>
          </template>
          <span slot="renderAction" slot-scope="data, record">
            <div
              style="padding: 4px; cursor: pointer"
              @click="() => $router.push(`/user/detail/${record._id}`)"
            >
              <a-icon type="solution" style="font-size: 20px; color: green" />
            </div>
          </span>
        </a-table>
        <div class="detail-item">{{ $t("CLASS_DETAIL_PARTICIPANTS") }}:</div>
        <a-table
          style="padding: 8px"
          :columns="userColumns"
          :row-key="(record) => record._id"
          :data-source="data.participants"
          :pagination="partiPagination"
          @change="handlePartiTableChange"
          :scroll="{ x: true }"
        >
          <template v-for="(val, index) in keyTitles" :slot="`title${index}`">
            <span :key="index">
              {{ $t(val) }}
            </span>
          </template>
          <span slot="renderAction" slot-scope="data, record">
            <div
              style="padding: 4px; cursor: pointer"
              @click="() => $router.push(`/user/detail/${record._id}`)"
            >
              <a-icon type="solution" style="font-size: 20px; color: green" />
            </div>
          </span>
        </a-table>
        <div class="detail-item">{{ $t("CLASS_DETAIL_GRADE_STRUCTURE") }}:</div>
        <a-table
          style="padding: 8px"
          :columns="gradeColumns"
          :row-key="(record) => record._id"
          :data-source="data.gradeStructure"
          :scroll="{ x: true }"
        >
          <template v-for="(val, index) in gradeTitles" :slot="`title${index}`">
            <span :key="index">
              {{ $t(val) }}
            </span>
          </template>
          <template slot="renderIsFinalized" slot-scope="val">
            <a-switch
              checked-children="TRUE"
              un-checked-children="FALSE"
              :checked="val"
              disabled
            ></a-switch>
          </template>
        </a-table>
        <div class="detail-item">
          {{ $t("CLASS_DETAIL_ENROLLED_STUDENTS") }}:
        </div>
        <a-table
          style="padding: 8px"
          :columns="enrolledColumns"
          :row-key="(record) => record._id"
          :data-source="enrolledData"
          :scroll="{ x: true }"
        >
          <template
            v-for="(val, index) in enrolledTitles"
            :slot="`title${index}`"
          >
            <span :key="index">
              {{ $t(val) }}
            </span>
          </template>
        </a-table>
      </a-card>
    </a-spin>
  </div>
</template>

<script>
const keyTitles = [
  "USER_TABLE_NAME",
  "USER_TABLE_EMAIL",
  "CLASS_DETAIL_ENROLLED_ID",
  "USER_TABLE_ACTION",
];
const gradeTitles = [
  "CLASS_DETAIL_GRADE_NAME",
  "CLASS_DETAIL_GRADE_POINT",
  "CLASS_DETAIL_GRADE_FINALIZED",
];
const enrolledTitles = [
  "CLASS_DETAIL_ENROLLED_NAME",
  "CLASS_DETAIL_ENROLLED_ID",
];
const userColumns = [
  {
    key: "name",
    dataIndex: "name",
    scopedSlots: { customRender: "renderName", title: "title0" },
  },
  {
    key: "email",
    dataIndex: "email",
    scopedSlots: { customRender: "renderEmail", title: "title1" },
  },
  {
    key: "studentId",
    dataIndex: "studentId",
    scopedSlots: { customRender: "renderStudentId", title: "title2" },
  },
  {
    key: "action",
    scopedSlots: { customRender: "renderAction", title: "title3" },
  },
];
const gradeColumns = [
  {
    key: "name",
    dataIndex: "name",
    scopedSlots: { customRender: "renderName", title: "title0" },
  },
  {
    key: "point",
    dataIndex: "point",
    scopedSlots: { customRender: "renderPoint", title: "title1" },
  },
  {
    key: "isFinalized",
    dataIndex: "isFinalized",
    scopedSlots: { customRender: "renderIsFinalized", title: "title2" },
  },
];
const enrolledColumns = [
  {
    key: "name",
    dataIndex: "name",
    scopedSlots: { customRender: "renderName", title: "title0" },
  },
  {
    key: "studentId",
    dataIndex: "studentId",
    scopedSlots: { customRender: "renderStudentId", title: "title1" },
  },
];
export default {
  data() {
    return {
      id: this.$route.params.id,
      loading: false,
      data: null,
      userColumns,
      keyTitles,
      teacherPagination: {
        current: 1,
        pageSize: 5,
        total: 0,
      },
      partiPagination: {
        current: 1,
        pageSize: 5,
        total: 0,
      },
      gradeTitles,
      gradeColumns,
      enrolledColumns,
      enrolledTitles,
      enrolledData: [],
    };
  },
  async mounted() {
    await this.getDetail();
    this.teacherPagination.total = this.data.teachers.length || 0;
    this.partiPagination.total = this.data.participants.length || 0;
    this.enrolledData = this.data.enrolledStudents.map(
      (student, studentIndex) => {
        let result = {
          _id: student._id,
          name: student.fullName,
          studentId: student.studentId,
        };
        const gradeIds = this.data.gradeStructure.map((struc) =>
          struc._id.toString()
        );
        gradeIds.forEach((gradeId, index) => {
          if (studentIndex === 0) {
            enrolledColumns.push({
              key: gradeId,
              dataIndex: gradeId,
              scopedSlots: {
                customRender: `render${gradeId}`,
                title: `title${index + enrolledTitles.length}`,
              },
            });
          }
          result[gradeId] = 0;
          const found = student.grades.find(
            (grade) => grade.gradeComponentId.toString() === gradeId
          );
          if (found) {
            result[gradeId] = found.point || 0;
          }
        });
        return result;
      }
    );
    this.data.gradeStructure.forEach((struc) => {
      this.enrolledTitles.push(struc.name);
    });
  },
  methods: {
    handleTeacherTableChange(pagination) {
      const pager = { ...this.teacherPagination };
      pager.current = pagination.current;
      this.teacherPagination = pager;
    },
    handlePartiTableChange(pagination) {
      const pager = { ...this.partiPagination };
      pager.current = pagination.current;
      this.partiPagination = pager;
    },
    async getDetail() {
      try {
        this.loading = true;
        const res = await this.$http.get(`/api/admin/courses/${this.id}`);
        this.data = res.data.data;
        this.loading = false;
      } catch (err) {
        this.openNotificationWithIcon("error", "FAIL_NOTI_TEXT", err.message);
        this.loading = false;
      }
    },
    openNotificationWithIcon(type, title, message) {
      this.$notification[type]({
        message: this.$t(title),
        description: this.$t(message),
        class: this.$store.state.settings.darkMode
          ? "app-dark-notification"
          : undefined,
      });
    },
  },
};
</script>

<style lang="less" scoped>
#class-detail-page {
  .detail-item {
    margin-bottom: 10px;
    font-size: 16px;
  }
}
</style>
