<template>
    <div class="modal position-static d-block">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        Suggest An Edit
                    </h5>
                </div>
                <div class="modal-body">
                    <form>
                        <InputTextGeneric
                            id="suggest-an-edit-item-name"
                            disabled
                            :label="meta.vs ? 'Name' : `${capitalizeCategory} Name`"
                            :value="metaName"
                        />
                        <InputTextGeneric
                            id="suggest-an-edit-name"
                            label="Your Name"
                            :spellcheck="false"
                            :v="$v.name"
                            :value="name"
                            @input="(value) => name = value"
                        />
                        <InputEmailGeneric
                            id="suggest-an-edit-email"
                            label="Your Email"
                            :v="$v.email"
                            :value="email"
                            @input="(value) => email = value"
                        />
                        <TextareaGeneric
                            id="suggest-an-edit-body"
                            helper-text="Please cite your sources wherever possible"
                            label="Suggested Edit"
                            :spellcheck="false"
                            :v="$v.body"
                            :value="body"
                            @input="(value) => body = value"
                        />
                    </form>
                </div>
                <div class="modal-footer d-flex justify-content-between">
                    <button
                        type="button"
                        class="btn btn-success"
                        :disabled="$v.$invalid"
                        @click.prevent="sendMessage"
                    >
                        Send Message
                    </button>
                    <button
                        class="btn btn-primary"
                        type="button"
                        @click.prevent="closeModal"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import { email, required } from 'vuelidate/lib/validators';

import EmailService from '@shared/services/emailService';

import capitalize from '@shared/mixins/capitalize';

import InputEmailGeneric from '@shared/components/form/ShInputEmailGeneric.vue';
import InputTextGeneric from '@shared/components/form/ShInputTextGeneric.vue';
import TextareaGeneric from '@shared/components/form/ShTextareaGeneric.vue';

export default {
    name: 'SuggestAnEditModal',
    components: {
        InputEmailGeneric,
        InputTextGeneric,
        TextareaGeneric,
    },
    mixins: [
        capitalize,
    ],
    props: {
        meta: {
            type: Object,
            default: () => {},
            required: true,
        },
    },
    data () {
        return {
            body: '',
            email: '',
            name: '',
        };
    },
    computed: {
        capitalizeCategory () {
            return this.capitalize(this.meta.category);
        },
        metaName () {
            return this.meta.mode === 'vs' ? `${this.meta.attribute} vs ${this.meta.tag}` : this.meta.name;
        },
    },
    methods: {
        ...mapActions({
            closeModal: 'modal/closeModal',
            createToast: 'toast/createToast',
        }),
        ...mapMutations({
            setError: 'error/setError',
        }),
        async sendMessage () {
            // Validate
            this.$v.$touch();
            if (this.$v.$invalid) {
                return;
            }

            // Submit
            try {
                await EmailService.sendEmail({
                    body: this.body,
                    itemName: this.meta.name,
                    itemCategory: this.meta.category,
                    senderEmail: this.email,
                    senderName: this.name,
                });
                this.createToast({ text: 'Success: Email sent.' });
                this.closeModal();
            } catch (error) {
                this.setError(error);
                this.createToast({
                    text: 'Error: Could not send email. Please try again later.',
                    theme: 'danger',
                });
            }
        },
    },
    validations: {
        body: {
            required,
        },
        email: {
            email,
            required,
        },
        name: {
            required,
        },
    },
};
</script>
