import {BudgetCategory} from "../../../store/models";
import {Button, Card, Column, Icon, Row, Space} from "../../../components";
import {StyleSheet, Text} from "react-native";
import {formatMoney} from "../../../models";
import React from "react";

type Props = {
    category: BudgetCategory & { editable: boolean },
    onEdit: () => void,
    onDelete: () => void
}

export function CategoryListItem({category, ...props}: Props) {
    const actions = category.editable ? (<Actions {...props}/>) : (<React.Fragment/>)
    return (
        <Card marginVertical={4} padding={16}>
            <Row justifyContent={"space-between"} alignItems={"center"}>
                <Column alignItems={"flex-start"}>
                    <Text>{category.name}</Text>
                    <Text>{formatMoney(category.categoryBudget)}</Text>
                </Column>
                {actions}
            </Row>
        </Card>
    )
}

type ActionsProps = {
    onEdit: () => void,
    onDelete: () => void
}

function Actions(props: ActionsProps) {
    return (
        <Row>
            <Button
                onClick={props.onEdit}
                color={"primary"}
                style={styles.categoryActionButton}>
                <Icon iconType={"configure"} size={18}/>
            </Button>
            <Space size={8}/>
            <Button
                onClick={props.onDelete}
                color={"error"}
                style={styles.categoryActionButton}>
                <Icon iconType={"delete"} size={18}/>
            </Button>
        </Row>
    )
}


const styles = StyleSheet.create({

    categoryActionButton: {
        padding: 8,
    }
})
