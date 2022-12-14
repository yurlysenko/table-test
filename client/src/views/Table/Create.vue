<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h4>Add user</h4>
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
          <button type="button" @click="saveUser" class="btn btn-primary">
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'userCreate',
  data() {
    return {
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
  methods: {
    saveUser() {
      var myThis = this
      axios.post('http://localhost:3000/users', this.model.user).then(res => {
        alert("Done")

        this.model.user = {
          name: '',
          username: '',
          email: '',
          phone: '',
          website: '',
        }

        this.errorList = '';
      })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 422) {
              myThis.errorList = error.response.data;
            }
            // console.log('Error', error.response.data)
            // console.log('Error', error.response.status)
            // console.log('Error', error.response.headers)
          } else if (error.request) {
            console.log('Error', error.request)
          } else {
            console.log('Error', error.message)
          }
        })
    }
  }
}
</script>