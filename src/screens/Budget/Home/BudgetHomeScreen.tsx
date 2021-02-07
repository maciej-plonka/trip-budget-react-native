import React from "react";
import {BudgetNavigationProps} from "../../../navigation";
import {Card, Center, Column, Row, Screen} from "../../../components";

export const BudgetHomeScreen = ({navigation, route}: BudgetNavigationProps<"BudgetHomeScreen">) => {
    return (
        <Screen>
            <Screen.Header title={"Trip budget"} color={"budget"}/>
            <Screen.Content>
                <Column padding={16}>
                    <Card padding={16}>
                        <Column>
                            <Row>
                                <Center>
                                </Center>
                            </Row>
                            <Row>

                            </Row>
                        </Column>
                    </Card>
                </Column>
            </Screen.Content>
            <Screen.Fab onClick={() => {
            }}/>
        </Screen>
    )
}
