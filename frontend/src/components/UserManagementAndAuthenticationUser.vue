<template>

    <v-card style="width:450px;" outlined color="surface">
        <template slot="progress">
            <v-progress-linear
                    color="primary-darker-1"
                    height="10"
                    indeterminate
            ></v-progress-linear>
        </template>

        <v-card-title v-if="value._links">
            사용자 # {{value._links.self.href.split("/")[value._links.self.href.split("/").length - 1]}}
        </v-card-title >
        <v-card-title v-else>
            사용자
        </v-card-title >

        <v-card-text>
            <String label="Profile" v-model="value.profile" :editMode="editMode" :inputUI="'TEXTAREA'"/>
            <Password offline label="Password" v-model="value.password" :editMode="editMode" @change="change"/>
            <Email offline label="Email" v-model="value.email" :editMode="editMode" @change="change"/>
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                    color="primary"
                    text
                    @click="edit"
                    v-if="!editMode"
            >
                Edit
            </v-btn>
            <v-btn
                    color="primary"
                    text
                    @click="save"
                    v-else
            >
                CreateUser
                DeleteUser
            </v-btn>
            <v-btn
                    color="primary"
                    text
                    @click="remove"
                    v-if="!editMode"
            >
                Delete
            </v-btn>
            <v-btn
                    color="primary"
                    text
                    @click="editMode = false"
                    v-if="editMode && !isNew"
            >
                Cancel
            </v-btn>
        </v-card-actions>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                    v-if="!editMode"
                    color="primary"
                    text
                    @click="openUpdateUser"
            >
                UpdateUser
            </v-btn>
            <v-dialog v-model="updateUserDiagram" width="500">
                <UpdateUserCommand
                        @closeDialog="closeUpdateUser"
                        @updateUser="updateUser"
                ></UpdateUserCommand>
            </v-dialog>
        </v-card-actions>

        <v-snackbar
                v-model="snackbar.status"
                :top="true"
                :timeout="snackbar.timeout"
                color="error"
        >
            {{ snackbar.text }}
            <v-btn dark text @click="snackbar.status = false">
                Close
            </v-btn>
        </v-snackbar>
    </v-card>

</template>

<script>
    const axios = require('axios').default;

    import Email from './vo/Email.vue';

    export default {
        name: 'UserManagementAndAuthenticationUser',
        components:{
            Email,
        },
        props: {
            value: [Object, String, Number, Boolean, Array],
            editMode: Boolean,
            isNew: Boolean,
            offline: Boolean,
        },
        data: () => ({
            snackbar: {
                status: false,
                timeout: 5000,
                text: ''
            },
            updateUserDiagram: false,
        }),
        computed:{
        },
        methods: {
            selectFile(){
                if(this.editMode == false) {
                    return false;
                }
                var me = this
                var input = document.createElement("input");
                input.type = "file";
                input.accept = "image/*";
                input.id = "uploadInput";
                
                input.click();
                input.onchange = function (event) {
                    var file = event.target.files[0]
                    var reader = new FileReader();

                    reader.onload = function () {
                        var result = reader.result;
                        me.imageUrl = result;
                        me.value.photo = result;
                        
                    };
                    reader.readAsDataURL( file );
                };
            },
            edit() {
                this.editMode = true;
            },
            async save(){
                try {
                    var temp = null;

                    if(!this.offline) {
                        if(this.isNew) {
                            temp = await axios.post(axios.fixUrl('/users'), this.value)
                        } else {
                            temp = await axios.put(axios.fixUrl(this.value._links.self.href), this.value)
                        }
                    }

                    if(this.value!=null) {
                        for(var k in temp.data) this.value[k]=temp.data[k];
                    } else {
                        this.value = temp.data;
                    }

                    this.editMode = false;
                    this.$emit('input', this.value);

                    if (this.isNew) {
                        this.$emit('add', this.value);
                    } else {
                        this.$emit('edit', this.value);
                    }

                    location.reload()

                } catch(e) {
                    this.snackbar.status = true
                    if(e.response && e.response.data.message) {
                        this.snackbar.text = e.response.data.message
                    } else {
                        this.snackbar.text = e
                    }
                }
                
            },
            async remove(){
                try {
                    if (!this.offline) {
                        await axios.delete(axios.fixUrl(this.value._links.self.href))
                    }

                    this.editMode = false;
                    this.isDeleted = true;

                    this.$emit('input', this.value);
                    this.$emit('delete', this.value);

                } catch(e) {
                    this.snackbar.status = true
                    if(e.response && e.response.data.message) {
                        this.snackbar.text = e.response.data.message
                    } else {
                        this.snackbar.text = e
                    }
                }
            },
            change(){
                this.$emit('input', this.value);
            },
            async updateUser(params) {
                try {
                    if(!this.offline) {
                        var temp = await axios.put(axios.fixUrl(this.value._links['/users/{username}'].href), params)
                        for(var k in temp.data) {
                            this.value[k]=temp.data[k];
                        }
                    }

                    this.editMode = false;
                    this.closeUpdateUser();
                } catch(e) {
                    this.snackbar.status = true
                    if(e.response && e.response.data.message) {
                        this.snackbar.text = e.response.data.message
                    } else {
                        this.snackbar.text = e
                    }
                }
            },
            openUpdateUser() {
                this.updateUserDiagram = true;
            },
            closeUpdateUser() {
                this.updateUserDiagram = false;
            },
        },
    }
</script>

