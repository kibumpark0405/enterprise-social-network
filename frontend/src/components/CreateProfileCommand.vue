<template>
    <v-card outlined>
        <v-card-title>
            CreateProfile
        </v-card-title>

        <v-card-text>
            <User offline label="User" v-model="value.user" :editMode="editMode" @change="change"/>
            <String label="FullName" v-model="value.fullName" :editMode="editMode"/>
            <Photo offline label="AvatarUrl" v-model="value.avatarUrl" :editMode="editMode" @change="change"/>
            <String label="Bio" v-model="value.bio" :editMode="editMode"/>
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                    color="primary"
                    text
                    @click="createProfile"
            >
                CreateProfile
            </v-btn>
            
            <v-btn
                    color="primary"
                    text
                    @click="close"
            >
                Close
            </v-btn>
        </v-card-actions>
    </v-card>

</template>

<script>
   
    export default {
        name: 'CreateProfileCommand',
        components:{},
        props: {},
        data: () => ({
            editMode: true,
            value: {},
        }),
        created() {
            this.value.user = {};
            this.value.fullName = '';
            this.value.avatarUrl = {};
            this.value.bio = '';
        },
        watch: {
        },
        methods: {
            createProfile() {
                this.$emit('createProfile', this.value);
            },
            close() {
                this.$emit('closeDialog');
            },
            change() {
                this.$emit('input', this.value);
            },
        }
    }
</script>

