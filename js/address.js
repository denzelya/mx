document.addEventListener('DOMContentLoaded', function () {
    // // 初始化戶籍地址 tw-city-selector
    // new TwCitySelector({
    //     el: '.tw-city-selector[data-name="household_address"]',
    //     elCounty: '[data-name="address_province"]',
    //     elDistrict: '[data-name="address_district"]', // 可加上區域選擇
    //     required: true
    // });

    // // 初始化通訊地址 tw-city-selector
    // new TwCitySelector({
    //     el: '.tw-city-selector[data-name="contact_address"]',
    //     elCounty: '[data-name="contact_province"]',
    //     elDistrict: '[data-name="contact_district"]', // 可加上區域選擇
    //     required: true
    // });


    document.querySelector('input[name="same_as_address"]').addEventListener('change', function () {
        // 確保選擇器能找到元素
        // const householdAddressCountySelect = document.querySelector('.tw-city-selector[data-name="household_address"] select[name="county"]');
        // const householdAddressDistrctSelect = document.querySelector('.tw-city-selector[data-name="household_address"] select[name="district"]');
        // const contactAddressCountySelect = document.querySelector('.tw-city-selector[data-name="contact_address"] select[name="county"]');
        // const contactAddressDistrctSelect = document.querySelector('.tw-city-selector[data-name="contact_address"] select[name="district"]');
        
        
        const householdAddressDetailInput = document.querySelector('input[name="household_address_detail"]');
        const contactAddressDetailInput = document.querySelector('input[name="contact_address_detail"]');

        // 檢查元素是否正確找到
        // if (!contactProvinceSelect || !addressProvinceSelect || !contactDetailInput || !addressDetailInput) {
        //     console.log("找不到某些元素");
        //     return;
        // }

        if (this.checked) {
            // 複製戶籍地址的省份和詳細地址
            // contactAddressCountySelect.value = householdAddressCountySelect.value;
            // contactAddressDistrctSelect.value = householdAddressDistrctSelect.value
            contactAddressDetailInput.value = householdAddressDetailInput.value
        } else {
            // 清空通訊地址
            householdAddressDetailInput.value = '';
            contactAddressDetailInput.value = '';
        }

    });
});