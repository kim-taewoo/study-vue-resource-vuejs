<template lang="html">
  <div class="container">
    <div class="row">
        <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
            <h1>Http</h1>
            <div class="form-group">
              <label>Username</label>
              <input class="form-control" v-model="user.username" type="text" name="" value="">
            </div>
            <div class="form-group">
              <label>Mail</label>
              <input class="form-control" v-model="user.email" type="text" name="" value="">
            </div>
            <button @click="submit" class="btn btn-primary" type="button" name="button">Submit</button>
            <hr>
            <input class="form-control" v-model="node" type="text" name="some_name" value="">
            <br><br>
            <button @click="fetchData" class="btn btn-primary" name="button">Get Data</button>
            <br>
            <br>
            <ul class="list-group">
              <li class="list-group-item" v-for="u in users">{{u.username}} - {{u.email}}</li>
            </ul>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        email: ''
      },
      users: [],
      resource: {},
      node: 'data'
    }
  },
  methods: {
    submit() {
      // this.$http.post('data.json', this.user)
      //   .then(response => {
      //     console.log(response);
      //   }).catch((e) => {
      //     console.log(e);
      //   });

      //this.resource.save({}, this.user);
      this.resource.saveAlt(this.user);
    },
    fetchData() {
      // this.$http.get('data.json')
      //   .then(response => {
      //     return response.json();
      //     //vue-resource 의 json() 이 response 받은 string 을 바로 object 화 시켜준다.
      //   })
      //   .then(data => {
      //     const resultArray = [];
      //     for (let key in data) {
      //       resultArray.push(data[key]);
      //     }
      //     this.users = resultArray;
      //   });
      this.resource.getData({node: this.node})
        .then(response => {
          return response.json();
          //vue-resource 의 json() 이 response 받은 string 을 바로 object 화 시켜준다.
        })
        .then(data => {
          const resultArray = [];
          for (let key in data) {
            resultArray.push(data[key]);
          }
          this.users = resultArray;
        });
    }
  },
  created() {
    const customActions = {
      saveAlt: {method: 'POST', url: 'alternative.json'},
      getData: {method: 'GET'}
    };
    this.resource = this.$resource('{node}.json',{},customActions);
  }
}
</script>

<style lang="css">
</style>
