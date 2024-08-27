<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import Button from './ui/button/Button.vue';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import Input from './ui/input/Input.vue';
import { toast } from 'vue-sonner';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { apiUrl } from '@/utils/environment';

const userStore = useUserStore()
const router = useRouter()

const isLoading = ref(false);
const name = ref(userStore.getUserInfo.name)
const scores = ref(userStore.getUserInfo.scores)

async function submitScore() {
    isLoading.value = true;
    try {
        const response = await fetch(`${apiUrl}/api/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name.value,
                score: scores.value,
            }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        toast.success('Scores Submitted!')
        router.push('/')
    } catch (error) {
        console.error(error);
        toast.error('Request error! Please Try Again Later.')
    } finally {
        isLoading.value = false;
    }
}
</script>

<template>
    <Dialog>
        <DialogTrigger as-child>
            <Button class="text-lg" size="lg">Submit Now</Button>
        </DialogTrigger>

        <DialogContent>
            <DialogHeader>
                <DialogTitle class="text-3xl">Post you scores now!</DialogTitle>
                <DialogDescription class="text-base">
                    Make sure the name is correct so you can update the scores with the same name. Click Confirm to
                    submit.
                </DialogDescription>
            </DialogHeader>

            <div class="flex flex-col gap-3 *:items-center">
                <div class="flex gap-2">
                    <h2 class="text-lg font-semibold">Name: </h2>
                    <Input type="text" class="text-lg font-bold w-3/4" disabled
                        :model-value="userStore.getUserInfo.name" />
                </div>

                <div class="flex gap-2">
                    <h2 class="text-lg font-semibold">Score: </h2>
                    <Input type="text" class="text-lg font-bold w-3/4" disabled
                        :model-value="userStore.getUserInfo.scores" />
                </div>
            </div>

            <DialogFooter class="w-full flex items-center">
                <Button class="text-base" size="default" @click="submitScore" :disabled="isLoading">{{ isLoading ?
                    'Submitting...' : 'Submit Now' }}</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>