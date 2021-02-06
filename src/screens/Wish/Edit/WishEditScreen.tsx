import {WishNavigationProps} from "../../../navigation";
import React, {useEffect} from "react";
import {
    Button,
    Center,
    FormButtonRow,
    FormCard,
    FormCategoryPicker,
    FormImagePicker,
    FormMoneyInput,
    FormTextArea,
    FormTextInput,
    Icon,
    Screen,
    Space,
    TextWhite
} from "../../../components";
import {confirmMessageBox} from "../../../models/MessageBox";
import {showToast} from "../../../models/Toast";
import {ScrollView, View} from "react-native";
import {useWishEdit} from "./WishEditHook";

export const WishEditScreen = ({navigation, route}: WishNavigationProps<"WishEditScreen">) => {
    const wishEdit = useWishEdit(route.params.itemId)
    useEffect(() => {
        !wishEdit && navigation.navigate("WishHomeScreen", {...route.params})
    }, [wishEdit])
    if (!wishEdit) return (<View/>)

    const handleDelete = async () => {
        const messageBoxOptions = {title: "Caution!", cardDescription: "Do you want to delete item?"};
        const shouldDelete = await confirmMessageBox(messageBoxOptions)
        if (!shouldDelete) {
            return;
        }
        wishEdit.remove()
        navigation.popToTop()
        showToast("Item deleted")
    }
    const handleUpdate = () => {
        wishEdit.update()
        showToast("Item updated")
        navigation.goBack()
    }

    const avatar = <FormImagePicker value={wishEdit.image} onChanged={wishEdit.setImage}/>;
    return (
        <Screen>
            <Screen.Header title={"Edit wish"} color={"wish"} />
            <Screen.Content>
                <ScrollView>
                    <Center style={{padding: 16}}>
                        <FormCard avatar={avatar}>
                            <FormCategoryPicker label={"Category"}
                                                value={wishEdit.category}
                                                onChanged={wishEdit.setCategory}
                                                values={wishEdit.categories}/>
                            <FormMoneyInput label={"Value"}
                                            value={wishEdit.targetValue}
                                            onChanged={wishEdit.setTargetValue}/>
                            <FormTextInput label={"Name"}
                                           value={wishEdit.name}
                                           onChanged={wishEdit.setName}
                                           icon={"notes"}/>
                            <FormTextArea label={"Comments"}
                                          value={wishEdit.comments}
                                          onChanged={wishEdit.setComments}
                                          icon={"notes"}/>
                            <FormButtonRow right>
                                <Button onClick={handleDelete} color={"error"}>
                                    <Icon iconType={"delete"} size={19} />
                                </Button>
                                <Space size={8} />
                                <Button onClick={handleUpdate} color={"primary"}>
                                    <Icon iconType={"confirm"} size={19} />
                                    <TextWhite>Edit</TextWhite>
                                </Button>
                            </FormButtonRow>
                        </FormCard>
                    </Center>
                </ScrollView>
            </Screen.Content>
        </Screen>
    )
}
