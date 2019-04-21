<template>
    <div class="container">
        <div class="row mt-5" v-if="$gate.isAdmin()">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Data Users</h3>
                        <div class="card-tools">
                            <button class="btn btn-success" @click="addModal">Add New
                                <i class="fas fa-user-plus fa-fw"></i></button>
                        </div>
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body table-responsive p-0">
                        <table class="table table-hover table-bordered">
                            <tbody>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Type</th>
                                    <th>Registered At</th>
                                    <th>Modify</th>
                                </tr>
                                <tr v-for="user in users.data" :key="user.id">
                                    <td>{{ user.id }}</td>
                                    <td>{{ user.name }}</td>
                                    <td>{{ user.email }}</td>
                                    <td>{{ user.tipe | upText }}</td>
                                    <td>{{ user.created_at | myDate }}</td>
                                    <td>
                                        <a href="#" @click="editModal(user)">
                                            <i class="fa fa-edit">Edit</i>
                                        </a>
                                        &nbsp;&nbsp;/&nbsp;&nbsp;
                                        <a href="#" @click="deleteUser(user.id)">
                                            <i class="fa fa-trash red">Hapus</i>
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- /.card-body -->
                    <div class="card-footer">
                        <pagination :data="users" @pagination-change-page="getResults"></pagination>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="!$gate.isAdmin()">
            <not-found></not-found>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="AddNew" tabindex="-1" role="dialog" aria-labelledby="AddNewLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" v-show="!editMode" id="AddNew">Tambah User</h5>
                        <h5 class="modal-title" v-show="editMode" id="AddNew">Update Data User</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form @submit.prevent="editMode ? updateUser() : createUser()">
                        <div class="modal-body">
                            <div class="form-group">
                                <input v-model="form.name" type="text" name="name" placeholder="Masukan Nama"
                                    class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
                                <has-error :form="form" field="name"></has-error>
                            </div>
                            <div class="form-group">
                                <input v-model="form.email" type="text" name="email" placeholder="Masukan Email"
                                    class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
                                <has-error :form="form" field="email"></has-error>
                            </div>
                            <div class="form-group">
                                <textarea v-model="form.bio" name="bio" placeholder="Sort bio for use (Optional)"
                                    id="bio" class="form-control"
                                    :class="{ 'is-invalid': form.errors.has('bio') }"></textarea>
                                <has-error :form="form" field="bio"></has-error>
                            </div>
                            <div class="form-group">
                                <select name="tipe" id="tipe" v-model="form.tipe" class="form-control"
                                    :class="{ 'is-invalid': form.errors.has('tipe') }">
                                    <option value="">Select User Role</option>
                                    <option value="user">Standard User</option>
                                    <option value="admin">Admin</option>
                                    <option value="super">Super</option>
                                </select>
                                <has-error :form="form" field="tipe"></has-error>
                            </div>
                            <div class="form-group">
                                <input v-model="form.password" type="password" autocomplete="off" name="password" class="form-control"
                                    :class="{ 'is-invalid': form.errors.has('password') }">
                                <has-error :form="form" field="password"></has-error>
                            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                            <button v-show="editMode" type="submit" class="btn btn-primary">Update</button>
                            <button v-show="!editMode" type="submit" class="btn btn-primary">Tambah</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                editMode: false,
                users: {},
                form: new Form({
                    id:'',
                    name: '',
                    email: '',
                    password: '',
                    tipe: '',
                    bio: '',
                    photo: ''
                })
            }
        },
        methods: {
            getResults(page = 1) {
			axios.get('api/user?page=' + page)
				.then(response => {
					this.users = response.data;
				});
		    },
            updateUser(){
                this.$Progress.start();
                //console.log('Edit data');
                this.form.put('api/user/'+this.form.id)
                .then(()=>{
                    this.$Progress.finish();
                    $('#AddNew').modal('hide');
                    Swal.fire(
                        'Update!',
                        'Information has been updated.',
                        'success'
                        )
                    Fire.$emit('AfterCreate');
                })
                .catch(()=>{
                    this.$Progress.fail();

                });
            },
            editModal(user){
                this.editMode = true;
                this.form.reset();
                $('#AddNew').modal('show');
                this.form.fill(user);
            },
            addModal(){
                this.editMode = false;
                this.form.reset();
                $('#AddNew').modal('show');
            },
            deleteUser(id){
                Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    // Send Request to the server
                    if(result.value){
                        this.form.delete('api/user/'+id).then(()=>{

                                Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                                )
                            Fire.$emit('AfterCreate');

                        }).catch(()=>{
                            Swal.fire('Failed!','There was something wronge.','warning');
                        });
                    }
                })
            },
            loadUsers(){
                if(this.$gate.isAdmin()){
                    axios.get('api/user').then(({ data }) => (this.users = data));
                }
            },

            createUser() {
                this.$Progress.start();

                this.form.post('api/user')
                .then(() => {
                    Fire.$emit('AfterCreate');
                    $('#AddNew').modal('hide');
                    Toast.fire({
                        type: 'success',
                        title: 'Berhasil Menambahkan Data'
                    });

                    this.$Progress.finish();
                }).catch(() => {
                    this.$Progress.fail();
                });

            }
        },
        created() {
            this.loadUsers();
            Fire.$on('AfterCreate',()=>{
                this.loadUsers();
            });
            //setInterval(() => this.loadUsers(), 3000);
        }
    }

</script>
