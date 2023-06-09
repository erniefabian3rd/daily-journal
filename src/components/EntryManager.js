
export const getEntries = () => {
  return fetch("http://localhost:8088/entries")
    .then(res => res.json())
};

export const searchEntries = (searched_term) => {
  return fetch(`http://localhost:8088/entries?q=${searched_term}`)
    .then(res => res.json())
};

export const getEntryById = id => {
  return fetch(`http://localhost:8088/entries/${id}`)
    .then(res => res.json())
};

export const addEntry = Entry => {
  return fetch("http://localhost:8088/entries", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(Entry)
  }).then(getEntries);
};

export const deleteEntry = entryId => {
  return fetch(`http://localhost:8088/entries/${entryId}`, {
    method: "DELETE"
  })
};

export const updateEntry = entry => {
  return fetch(`http://localhost:8088/entries/${entry.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(entry)
  })
};

export const getTags = () => {
  return fetch("http://localhost:8088/tags")
    .then(res => res.json())
};

export const getEntryTags = () => {
  return fetch("http://localhost:8088/entry_tags")
    .then(res => res.json())
};