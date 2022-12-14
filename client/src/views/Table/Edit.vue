<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h4>Edit user</h4>
      </div>
      <div class="card-body">
        <ul class="alert alert-warning" v-if="Object.keys(this.errorList).length > 0">
          <li class="mb-0 ms-3" v-for="(error, index) in this.errorList" :key="index">
            {{ error[ 0 ] }}
          </li>
        </ul>
        <div class="mb-3">
          <label for="">Name</label>
          <input type="text" v-model="model.user.name" class="form-control" />
        </div>
        <div class="mb-3">
          <label for="">Username</label>
          <input type="text" class="form-control" v-model="model.user.username" />
        </div>
        <div class="mb-3">
          <label for="">Email</label>
          <input type="text" class="form-control" v-model="model.user.email" />
        </div>
        <div class="mb-3">
          <label for="">Phone</label>
          <input type="text" class="form-control" v-model="model.user.phone" />
        </div>
        <div class="mb-3">
          <label for="">Domen</label>
          <input type="text" class="form-control" v-model="model.user.website" />
        </div>
        <div class="mb-3">
          <button type="button" @click="updateUser" class="btn btn-primary">
            Update
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'userEdit',
  data() {
    return {
      userId: '',
      errorList: '',
      model: {
        user: {
          name: '',
          username: '',
          email: '',
          phone: '',
          website: '',
        }
      }
    }
  },
  mounted() {
    this.userId = this.$route.params.id;
    this.getUserData(this.$route.params.id);
  },
  methods: {
    getUserData(userId) {
      console.log(this.$route.params.id);
      axios.get(`http://localhost:3000/users/${this.userId}`).then(res => {
        this.model.user = res.data
      })
    },
    updateUser() {
      var myThis = this
      console.log(this.userId);
      axios.put(`http://localhost:3000/users/${this.userId}`, this.model.user).then(res => {
        alert("Done")

        this.errorList = '';
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
  }
}
</script>