import {WishNavigationProps} from "../../../navigation";
import {useThemeContext} from "../../../contexts/ThemeContext";
import React, {useEffect} from "react";
import {
    Center,
    FormButtonRow,
    FormCard,
    FormCategoryPicker,
    FormCreateButton,
    FormImagePicker,
    FormMoneyInput,
    FormTextInput,
    Screen
} from "../../../components";
import {useWishNew} from "./WishNewHook";
import {ScrollView, View} from "react-native";
import {showToast} from "../../../models/Toast";

export const WishNewScreen = ({route, navigation}: WishNavigationProps<"WishNewScreen">) => {
    const theme = useThemeContext();
    const item = useWishNew(route.params.tripId)
    useEffect(() => {
        !item && navigation.goBack()
    }, [item])
    if (!item) return (<View/>)

    const handleCreateItem = () => {
        item.create()
        showToast("Item created")
        navigation.goBack()
    }
    return (
        <Screen>
            <Screen.Header title={"New item"} color={theme.colors.headers.wish}/>
            <Screen.Content>
                <ScrollView>
                    <Center styles={{padding: 16}}>
                        <FormCard avatar={<FormImagePicker value={item.imageId} onChanged={item.setImageId}/>}>
                            <FormCategoryPicker label={"Category"} value={item.category} onChanged={item.setCategory}
                                                values={item.categories}/>
                            <FormMoneyInput label={"Value"} value={item.targetValue} onChanged={item.setTargetValue}/>
                            <FormTextInput label={"Name"} value={item.name} onChanged={item.setName} icon={"name"}/>
                            <FormButtonRow right>
                                <FormCreateButton onClick={handleCreateItem}/>
                            </FormButtonRow>
                        </FormCard>
                    </Center>
                </ScrollView>
            </Screen.Content>
        </Screen>
    )
}
