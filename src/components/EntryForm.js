import React, { useState, useEffect } from "react"

export const EntryForm = ({ entry, moods, onFormSubmit, tags }) => {
    const [editMode, setEditMode] = useState(false)
    const [updatedEntry, setUpdatedEntry] = useState(entry)
    const [selectedTags, setSelectedTags] = useState([])

    useEffect(() => {
        setUpdatedEntry(entry)
        if ('id' in entry) {
            setEditMode(true)
        }
        else {
            setEditMode(false)
        }
    }, [entry])

    const handleControlledInputChange = (event) => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const newEntry = { ...updatedEntry }
        const { name, value, type, checked } = event.target
        if (type === "checkbox") {
            if (checked) {
                setSelectedTags([...selectedTags, value])
            } else {
                setSelectedTags(selectedTags.filter(tag => tag !== value))
            }
        } else {
            newEntry[name] = value
            setUpdatedEntry(newEntry)
        }
    }
    


    const constructNewEntry = () => {
        const copyEntry = { ...updatedEntry }
        copyEntry.mood_id = parseInt(copyEntry.mood_id)
        copyEntry.tags = selectedTags
        if (!copyEntry.date) {
            copyEntry.date = Date(Date.now()).toLocaleString('en-us').split('GMT')[0]
        }
        onFormSubmit(copyEntry)
        setSelectedTags([])
    }

    return (
        <article className="panel is-info">
            <h2 className="panel-heading">{editMode ? "Update Entry" : "Create Entry"}</h2>
            <div className="panel-block">
                <form style={{ width: "100%" }}>
                    <div className="field">
                        <label htmlFor="concept" className="label">Concept: </label>
                        <div className="control">
                            <input type="text" name="concept" required autoFocus className="input"
                                proptype="varchar"
                                placeholder="Concept"
                                value={updatedEntry.concept}
                                onChange={handleControlledInputChange}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label htmlFor="entry" className="label">Entry: </label>
                        <div className="control">
                            <textarea
                                className="textarea"
                                name="entry"
                                value={updatedEntry.entry}
                                onChange={handleControlledInputChange}
                            ></textarea>
                        </div>
                    </div>
                    <div className="field">
                        <label htmlFor="mood_id" className="label">Mood: </label>
                        <div className="control">
                            <div className="select">
                                <select name="mood_id"
                                    proptype="int"
                                    value={updatedEntry.mood_id}
                                    onChange={handleControlledInputChange}>
                                        <option value="0">Select a mood</option>
                                        {moods.map(m => (
                                            <option key={m.id} value={m.id}>
                                                {m.label}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <label htmlFor="tag_id" className="label">Tags:</label>
                        <div className="control">
                            {tags.map((tag) => (
                                <label key={tag.id} className="checkbox">
                                    <input
                                        type="checkbox"
                                        name="tags"
                                        className="checkbox"
                                        value={tag.id}
                                        checked={updatedEntry.checked}
                                        onChange={handleControlledInputChange}
                                        />
                                        {tag.name}
                                </label>
                                ))}
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <button type="submit"
                                onClick={evt => {
                                    evt.preventDefault()
                                    constructNewEntry()
                                    setSelectedTags([])
                                }}
                                className="button is-link">
                                {editMode ? "Update" : "Save"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </article>
    )
}
