<template>
  <div class='container'>
    <div class="card">
      <div class="card-header">
        <h4>
          Table
          <RouterLink to='/table/create' class='btn btn-primary ml-5 float-end'>
            Add user
          </RouterLink>
          <div class="col-md-4 me-5 float-end">
            <input v-model="search" type="search" class="form-control"
              placeholder="Search by name,email,phone,or address..." />
          </div>
          <div class="col-md-2 float-end">
            <select v-model="pageSize" class="form-select" @change="changePageSize">
              <option v-for="option in pageOptions" :value="option" :key="option">
                {{ option }}
              </option>
            </select>
          </div>
        </h4>
      </div>
      <div class="card-body">
        <table class='table'>
          <thead>
            <tr>
              <th class="pe-auto text-center" @click="sortColumn('name')">
                Name
                <SvgIcon />
              </th>
              <th class="pointer-text text-center" @click="sortColumn('username')">
                Username
                <SvgIcon />
              </th>
              <th class="pointer-text text-center" @click="sortColumn('email')">
                Email
                <SvgIcon />
              </th>
              <th class="pointer-text text-center" @click="sortColumn('phone')">
                Phone
                <SvgIcon />
              </th>
              <th class="pointer-text text-center" @click="sortColumn('website')">
                Website
                <SvgIcon />
              </th>
              <th class="text-center">Edit</th>
              <th class="text-center">Delete</th>
            </tr>
          </thead>
          <tbody v-if="paginatedUsers.length > 0">
            <tr v-for="(user, index) in paginatedUsers" :key="index">
              <td>{{ user.name }}</td>
              <td>{{ user.username }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.phone }}</td>
              <td>{{ user.website }}</td>
              <td>
                <RouterLink :to="{ path: `/table/${user._id}/edit` }" class='btn btn-action'>
                  <IconEdit />
                </RouterLink>
              </td>
              <td>
                <button type='button' @click="deleteUser(user._id)" class='btn btn-action'>
                  <IconDelete />
                </button>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan='8'>Loading...</td>
            </tr>
          </tbody>
        </table>
        <nav v-if="pages.length > 1">
          <ul class="pagination">
            <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
              <button class="page-link" @click="changePage(currentPage - 1)">
                Previous
              </button>
            </li>
            <li class="page-item" v-for="page in pages" :key="page" :class="{ 'active': currentPage === page }">
              <button class="page-link" @click="changePage(page)">
                {{ page }}
              </button>
            </li>
            <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
              <button class="page-link" @click="changePage(currentPage + 1)">
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn-action {
  background-color: #FFD741;
  width: 35px;
  height: 35px;
  border-radius: 35px;
  box-shadow: 0px 2px 2px gray;
}

.btn-action > svg {
  width: 16px;
  bottom: 3px;
  right: 3px;
  position: relative;
}
</style>

<script>
import axios from 'axios';
import SvgIcon from '../Icons/SortArrows.vue';
import IconEdit from '../Icons/IconEdit.vue';
import IconDelete from '../Icons/IconDelete.vue';

export default {
  name: 'users',
  components: { SvgIcon, IconDelete, IconEdit },
  data() {
    return {
      users: [],
      search: '',
      currentPage: 1,
      pageSize: 5,
      sortKey: '',
      sortDirection: 1,
    }
  },
  computed: {
    filteredUsers() {
      const searchTerm = this.search.toLowerCase();
      return this.users.filter(user =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
      );
    },
    totalPages() {
      return Math.ceil(this.filteredUsers.length / this.pageSize);
    },
    paginatedUsers() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.filteredUsers.slice(startIndex, endIndex);
    },
    pages() {
      return Array.from({ length: this.totalPages }, (_, index) => index + 1);
    },
    pageOptions() {
      return [2, 5, 10, 20];
    },
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      axios.get('http://localhost:3000/users').then(res => {
        this.users = res.data
      });
    },
    deleteUser(userId) {
      if (confirm('Are you sure, you want to delete this data ?')) {
        axios.delete(`http://localhost:3000/users/${userId}`).then(res => {
          this.getUsers();
        })
          .catch((error) => {
            if (error.response) {
              if (error.response.status = 422) {
                myThis.errorList = error.response.data;
              }
              if (error.response.status === 404) {
                alert(error.response.data.message)
              }
            }
          })
      }
    },
    sortColumn(key) {
      if (this.sortKey === key) {
        this.sortDirection *= -1; // Reverse the sort direction if the same column is clicked again
      } else {
        this.sortDirection = 1; // Set the default sort direction for a new column
        this.sortKey = key;
      }

      // Sort the users array based on the selected column and direction
      this.users.sort((a, b) => {
        const valueA = a[key].toLowerCase();
        const valueB = b[key].toLowerCase();

        if (valueA < valueB) {
          return -1 * this.sortDirection;
        } else if (valueA > valueB) {
          return 1 * this.sortDirection;
        } else {
          return 0;
        }
      });
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    emitSearchValue() {
      this.currentPage = 1;
    },
  }
}
</script>