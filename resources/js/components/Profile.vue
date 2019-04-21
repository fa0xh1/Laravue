<style lang="css">
    .widget-user-header {
        background-position: center center;
        background-size: cover;
        height: 250px !important;
    }

    .widget-user .card-footer {
        padding: 0;
    }

</style>

<template>
    <div class="container">
        <div class="row mt-5">
            <div class="col-md-12">
                <div class="card card-widget widget-user">
                    <!-- Add the bg color to the header using any of the bg-* classes -->
                    <div class="widget-user-header text-white" style="background-image: url('./img/bg.jpg')">
                        <h3 class="widget-user-username">{{ this.form.name }}</h3>
                        <h5 class="widget-user-desc">{{ this.form.tipe | upText }}</h5>
                    </div>
                    <div class="widget-user-image">
                        <img class="img-circle" :src="getProfilePhoto()" alt="User Avatar">
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header p-2">
                            <ul class="nav nav-pills">
                                <li class="nav-item"><a class="nav-link" href="#activity" data-toggle="tab">Activity</a>
                                </li>
                                <li class="nav-item"><a class="nav-link active show" href="#settings"
                                        data-toggle="tab">Settings</a></li>
                            </ul>
                        </div><!-- /.card-header -->
                        <div class="card-body">
                            <div class="tab-content">
                                <!-- Activity Tab -->
                                <div class="tab-pane" id="activity">
                                    <h3 class="text-center">Display User Activity</h3>
                                </div>
                                <!-- Setting Tab -->
                                <div class="tab-pane active show" id="settings">
                                    <form class="form-horizontal">
                                        <div class="form-group">
                                            <label for="inputName" class="col-sm-2 control-label">Name</label>

                                            <div class="col-sm-12">
                                                <input type="text" v-model="form.name" class="form-control"
                                                    id="inputName" placeholder="Name"
                                                    :class="{ 'is-invalid': form.errors.has('name') }">
                                                <has-error :form="form" field="name"></has-error>
                                            </div>

                                        </div>
                                        <div class="form-group">
                                            <label for="inputEmail" class="col-sm-2 control-label">Email</label>

                                            <div class="col-sm-12">
                                                <input type="email" v-model="form.email" class="form-control"
                                                    id="inputEmail" placeholder="Email"
                                                    :class="{ 'is-invalid': form.errors.has('email') }">
                                                <has-error :form="form" field="email"></has-error>
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <label for="inputExperience"
                                                class="col-sm-2 control-label">Experience</label>

                                            <div class="col-sm-12">
                                                <textarea class="form-control" name="bio" v-model="form.bio"
                                                    id="inputExperience" placeholder="Experience"
                                                    :class="{ 'is-invalid': form.errors.has('bio') }"></textarea>
                                                <has-error :form="form" field="bio"></has-error>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="photo" class="col-sm-2 control-label">Profile Photo</label>
                                            <div class="col-sm-12">
                                                <input type="file" @change="uploadProfile" name="photo"
                                                    class="form-input">
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <label for="password" class="col-sm-12 control-label">Passport (leave empty
                                                if not changing)</label>

                                            <div class="col-sm-12">
                                                <input type="password" v-model="form.password" class="form-control"
                                                    id="password" placeholder="Passport"
                                                    :class="{ 'is-invalid': form.errors.has('password') }">
                                                <has-error :form="form" field="password"></has-error>
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <div class="col-sm-offset-2 col-sm-12">
                                                <button @click.prevent="updateInfo" type="submit"
                                                    class="btn btn-success">Update</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <!-- /.tab-pane -->
                            </div>
                            <!-- /.tab-content -->
                        </div><!-- /.card-body -->
                    </div>
                    <!-- /.nav-tabs-custom -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: new Form({
                    id: '',
                    name: '',
                    email: '',
                    password: '',
                    tipe: '',
                    bio: '',
                    photo: ''
                })
            }
        },
        mounted() {
            console.log('Component mounted.')
        },
        methods: {
            getProfilePhoto(){

                let photo = (this.form.photo.length > 200) ? this.form.photo : "img/profile/"+this.form.photo ;
                return photo;
            },
            updateInfo() {
                this.$Progress.start();
                this.form.put('api/profile')
                    .then(() => {
                        this.$Progress.finish();
                    })
                    .catch(() => {
                        this.$Progress.fail();
                    })
            },
            uploadProfile(e) {
                let file = e.target.files[0];
                console.log(file);
                if (file['size'] < 2111775) {
                    let reader = new FileReader();
                    reader.onloadend = (file) => {
                        //console.log('RESULT', reader.result)
                        this.form.photo = reader.result;
                    }
                    reader.readAsDataURL(file)
                } else {
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: 'You are uploading a large file',
                    });
                }
            }
        },

        created() {
            axios.get("api/profile")
                .then(({
                    data
                }) => (this.form.fill(data)));
        }
    }

</script>
