<script setup>
	import { ref } from 'vue';
	import Btn from './UI/Btn.vue';
	import InputCustom from './UI/InputCustom.vue';
	import Toast from './UI/Toast.vue';
	import functions from '@/functions';
	import { usePopupStore } from '@/stores/popupStore';
	import { useBooksStore } from '@/stores/booksStore';
	import { useToastStore } from '@/stores/toaster';


	const popupStore = usePopupStore();
	const booksStore = useBooksStore();
	const toastStore = useToastStore();

	const dataBookObj = popupStore.objDataProps;

	const idBook = ref(dataBookObj.idBook);
	const titleBook = ref(dataBookObj.titleBook);
	const authorBook = ref(dataBookObj.authorBook);
	const countPage = ref(dataBookObj.countPage);
	const dateStart = ref(dataBookObj.dateStartRead);
	const dateEnd = ref(dataBookObj.dateEndRead);

	function updateDataBook() {
		booksStore.sendDataComponent({
			idBook: idBook.value,
			titleBook: titleBook.value, 
			authorBook: authorBook.value, 
			countPage: countPage.value, 
			dateStartRead: dateStart.value, 
			dateEndRead: dateEnd.value,
		})
		functions.toastVisible(toastStore);
		popupStore.closePopup();
	}

</script>

<template>
    <div class="settings-book">
        <div class="settings-book__title">Редактирование книги</div>
        <div class="settings-book__inputs">
            <InputCustom placeholder-text='Название' type-input="Text" v-model="titleBook"></InputCustom>
            <InputCustom placeholder-text='Автор' type-input="Text" v-model="authorBook"></InputCustom>
            <InputCustom placeholder-text='Количество страниц' type-input="Number" v-model="countPage"></InputCustom>
						<div class="settings-book__inputs-wrapper">
							<InputCustom placeholder-text='Дата начала чтения' type-input="Date" v-model="dateStart"></InputCustom>
            				<InputCustom placeholder-text='Дата окончания чтения' type-input="Date" v-model="dateEnd"></InputCustom>
						</div>
        </div>
        <div class="settings-book__btn">
            <Btn @click="updateDataBook">Сохранить изменения</Btn>
        </div>
    </div>

</template>

<style lang="stylus">

	.settings-book
		display: flex;
		flex-direction: column;
		&__title
			font-weight: 700
			margin-bottom: 20px
			font-size: 20px
		&__inputs
			display: flex;
			flex-direction: column;
			gap: 20px
			&-wrapper
				display: grid
				grid-template-columns: minmax(0px, 1fr)
				gap: 12px
				+min(mobile)
					grid-template-columns: repeat(2, minmax(0px, 1fr))
					column-gap: 24px
		&__btn
			display: flex;
			justify-content: center;
			margin-top: 20px;

</style>