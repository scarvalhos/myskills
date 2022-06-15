import React, { useEffect, useState } from "react"
import { FlatList, Platform, StyleSheet, Text, TextInput, View } from "react-native"

import { Button } from "../components/Button"
import { SkillCard } from "../components/SkillCard"

interface SkillDataProps {
    id: string
    name: string
}

export default function Home() {
    const [ newSkill, setNewSkill ] = useState('')
    const [ mySkills, setMySkills ] = useState<SkillDataProps[]>([])
    const [ greeting, setGreeting ] = useState('')

    function handleAddNewSkill() {
        const data = {
            id: String(new Date().getTime()),
            name: newSkill
        }
        setMySkills(oldState => [...oldState, data])
    }

    function handleRemoveSkill(id: string) {
        setMySkills(oldState => oldState.filter(
            skill => skill.id !== id
        ))
    }

    useEffect(() => {
        const currentHour = new Date().getHours()

        if(currentHour < 12) {
            setGreeting('Good morning')
        } else if (currentHour >= 12 && currentHour < 18) {
            setGreeting('Good afternoon')
        } else {
            setGreeting('Good night')
        }
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome, Samara</Text>
            <Text style={styles.greeting}>{greeting}</Text>

            <TextInput
                style={styles.input}
                placeholder="New skill"
                placeholderTextColor="#555555"
                onChangeText={setNewSkill}
            />

            <Button title="Add" onPress={handleAddNewSkill} />

            <Text style={[styles.title, { marginVertical: 40 }]}>
                My skills
            </Text>

            <FlatList
                data={mySkills}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <SkillCard
                        skill={item}
                        onPress={() => handleRemoveSkill(item.id)}
                    />
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121015',
        paddingHorizontal: 30,
        paddingVertical: 70,
    },
    title: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold',
    },
    greeting: {
        color: '#666',
        fontSize: 16
    },
    input: {
        backgroundColor: '#1F1E25',
        color: '#FFF',
        fontSize: 18,
        padding: Platform.OS === 'ios' ? 15 : 10,
        marginTop: 30,
        borderRadius: 7,
    },
})