import {BudgetCategory} from "../../../store/models";
import {Id} from "../../../store";
import {useSelector} from "react-redux";
import {selectBudgetCategoriesByTripId} from "../../../store/selectors";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {Modal, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import {Icons} from "../../../icons";

function useCategoryPicker(tripId: Id, onCategoryChanged: (selectedCategory: SelectedBudgetCategory) => void) {
    const categories = useSelector(selectBudgetCategoriesByTripId(tripId));
    const [open, setOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<SelectedBudgetCategory>({type: "All"})

    const selectCategory = useCallback((selectedCategory: SelectedBudgetCategory) => {
        setSelectedCategory(selectedCategory)
        onCategoryChanged(selectedCategory)
        setOpen(false);
    }, []);

    const openModal = useCallback(() => setOpen(true), []);
    const modalProps = useMemo(() => ({
        visible: open,
        onRequestClose: () => setOpen(false)
    }), [open])
    return {
        categories,
        displayCategory: selectedCategory.type == "Specific" ? selectedCategory.category.name : selectedCategory.type,
        openModal,
        selectEssentials: () => selectCategory({type: "Essentials"}),
        selectAll: () => selectCategory({type: "All"}),
        select: (category: BudgetCategory) => selectCategory({type: "Specific", category}),
        modalProps
    }
}

export type SelectedBudgetCategory = { type: "All" } |
    {type: "Essentials"} |
    { type: "Specific", category: BudgetCategory }


type Props = {
    tripId: Id,
    onCategoryChanged: (category: SelectedBudgetCategory) => void,
}

export function CategoryPicker({onCategoryChanged, tripId}: Props) {
    const categoryPicker = useCategoryPicker(tripId, onCategoryChanged);
    return (
        <>
            <Pressable onPress={categoryPicker.openModal}>
                <View style={styles.root}>
                    <Text style={styles.categoryName}>{categoryPicker.displayCategory}</Text>
                    <Icons.List color={"#000"} width={16} height={16}/>
                </View>
            </Pressable>
            <Modal animationType={"slide"}  {...categoryPicker.modalProps}>
                <ScrollView>
                    <Pressable onPress={categoryPicker.selectAll}>
                        <ModalItem name={"All"}/>
                    </Pressable>
                    <Pressable onPress={categoryPicker.selectEssentials}>
                        <ModalItem name={"Essentials"}/>
                    </Pressable>
                    {categoryPicker.categories.map(it => (
                        <Pressable key={it.id} onPress={() => categoryPicker.select(it)}>
                            <ModalItem name={it.name}/>
                        </Pressable>
                    ))}
                </ScrollView>
            </Modal>
        </>

    )
}


type ItemProps = {
    name: string,
}

function ModalItem({name}: ItemProps) {
    return (
        <View style={styles.modalItem}>
            <Text style={styles.modalItemText}>{name}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    root: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
        paddingHorizontal: 24,
        backgroundColor: "white",
        borderRadius: 24,
        height: 48,
        elevation: 2,
    },
    categoryName: {
        fontSize: 18
    },
    modalItem: {
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderBottomColor: "rgba(0,0,0,0.1)",
        borderBottomWidth: 0.5,
    },
    modalItemText: {
        fontSize: 18
    }
})
