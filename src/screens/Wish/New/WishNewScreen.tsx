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
    FormTextInput,
    Icon,
    Screen,
    TextWhite
} from "../../../components";
import {useWishNew} from "./WishNewHook";
import {ScrollView, View} from "react-native";
import {showToast} from "../../../models/Toast";

export const WishNewScreen = ({route, navigation}: WishNavigationProps<"WishNewScreen">) => {
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
            <Screen.Header title={"New item"} color={"wish"}/>
            <Screen.Content>
                <ScrollView>
                    <Center style={{padding: 16}}>
                        <FormCard avatar={<FormImagePicker value={item.image} onChanged={item.setImage}/>}>
                            <FormCategoryPicker label={"Category"} value={item.category} onChanged={item.setCategory}
                                                values={item.categories}/>
                            <FormMoneyInput label={"Value"} value={item.targetValue} onChanged={item.setTargetValue}/>
                            <FormTextInput label={"Name"} value={item.name} onChanged={item.setName} icon={"notes"}/>
                            <FormButtonRow right>
                                <Button onClick={handleCreateItem} color={"primary"}>
                                    <Icon iconType={"confirm"} size={19} />
                                    <TextWhite>Create</TextWhite>
                                </Button>
                            </FormButtonRow>
                        </FormCard>
                    </Center>
                </ScrollView>
            </Screen.Content>
        </Screen>
    )
}
