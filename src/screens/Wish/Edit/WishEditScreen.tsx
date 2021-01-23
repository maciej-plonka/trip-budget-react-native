import {WishNavigationProps} from "../../../navigation";
import React, {useEffect} from "react";
import {useThemeContext} from "../../../contexts/ThemeContext";
import {Center} from "../../../components/Center";
import {
    FormButtonRow,
    FormBuyButton,
    FormCard,
    FormCategoryPicker,
    FormDeleteButton,
    FormImagePicker,
    FormMoneyInput,
    FormTextArea,
    FormTextInput,
    FormUpdateButton
} from "../../../components/Form";
import {confirmMessageBox} from "../../../models/MessageBox";
import {showToast} from "../../../models/Toast";
import {ScrollView, View} from "react-native";
import {useWishEdit} from "./WishEditHook";
import {Screen} from "../../../components/Screen";

export const WishEditScreen = ({navigation, route}: WishNavigationProps<"WishEditScreen">) => {
    const color = useThemeContext().colors.headers.wish
    const wishEdit = useWishEdit(route.params.itemId)
    useEffect(() => {
        !wishEdit && navigation.goBack()
    }, [wishEdit])

    if (!wishEdit) return (<View/>)

    const handleDelete = async () => {
        const messageBoxOptions = {title: "Caution!", description: "Do you want to delete item?"};
        const shouldDelete = await confirmMessageBox(messageBoxOptions)
        if (!shouldDelete) {
            return;
        }
        wishEdit.delete()
        showToast("Item deleted")
    }
    const handleUpdate = () => {
        wishEdit.update()
        showToast("Item updated")
        navigation.goBack()
    }

    const handleBuy = () => {
    }

    return (
        <Screen>
            <Screen.Header title={"Edit wish"} color={color} />
            <Screen.Content>
                <ScrollView>
                    <Center styles={{padding: 16}}>
                        <FormCard avatar={<FormImagePicker value={wishEdit.imageId} onChanged={wishEdit.setImageId}/>}>
                            <FormCategoryPicker label={"Category"} value={wishEdit.category} onChanged={wishEdit.setCategory}
                                                values={wishEdit.categories}/>
                            <FormMoneyInput label={"Value"} value={wishEdit.targetValue} onChanged={wishEdit.setTargetValue}/>
                            <FormTextInput label={"Name"} value={wishEdit.name} onChanged={wishEdit.setName} icon={"name"}/>
                            <FormTextArea label={"Comments"} value={wishEdit.comments} onChanged={wishEdit.setComments}
                                          icon={"name"}/>
                            <FormButtonRow center>
                                <FormDeleteButton onClick={handleDelete}/>
                                <FormBuyButton onClick={handleBuy}/>
                                <FormUpdateButton onClick={handleUpdate}/>
                            </FormButtonRow>
                        </FormCard>
                    </Center>
                </ScrollView>
            </Screen.Content>
        </Screen>
    )
}
