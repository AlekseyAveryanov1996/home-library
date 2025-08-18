<script setup>
	import { ref } from 'vue';
	import Btn from './UI/Btn.vue';
	import InputCustom from './UI/InputCustom.vue';
	import { usePopupStore } from '@/stores/popupStore';

	const popupStore = usePopupStore();

	const dataBookObj = popupStore.objDataProps;

	const titleBook = ref(dataBookObj.titleBook);
	const authorBook = ref(dataBookObj.authorBook);
	const countPage = ref(dataBookObj.countPage);
	const dateStart = ref('')
	const dateEnd = ref('22.02.1996')

</script>

<template>
    <div class="settings-book">
        <div class="settings-book__title">Редактирование книги</div>
        <div class="settings-book__inputs">
            <InputCustom placeholder-text='Название' type-input="Text" v-model="titleBook"></InputCustom>
            <InputCustom placeholder-text='Автор' type-input="Text" v-model="authorBook"></InputCustom>
            <InputCustom placeholder-text='Количество страниц' type-input="Text" v-model="countPage"></InputCustom>
						<div class="settings-book__inputs-wrapper">
							<InputCustom placeholder-text='Дата начала чтения' type-input="Date" v-model="dateStart"></InputCustom>
            	<InputCustom placeholder-text='Дата окончания чтения' type-input="Date" v-model="dateEnd"></InputCustom>
						</div>
        </div>
        <div class="settings-book__btn">
            <Btn>Сохранить изменения</Btn>
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