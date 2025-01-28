import { createContext, useContext, useState, useEffect } from 'react'
import {
  fetchHomePageEvents,
  fetchHomePageArticles,
  fetchHomePageGroups,
  fetchGroupsPageGroups,
  fetchEventsPageEvents,
  fetchTrendingBarCategories,
  fetchNewsPageArticles,
  fetchSidebarGroups,
  fetchSidebarArticles
} from '../utils/helpers/firebase/fetchData'
import {
  placeholderArray2,
  placeholderArray3,
  placeholderArray4,
  placeholderArray6,
  placeholderArray7,
  placeholderArray12,
  placeholderArray15,
  placeholderArray20
} from '../utils/constants/placeholders'

const DatabaseContext = createContext()

export const useDatabase = () => {
  return useContext(DatabaseContext)
}

export const DatabaseProvider = ({ children }) => {
  const [homePageEvents, setHomePageEvents] = useState(null)
  const [homePageEvents1, setHomePageEvents1] = useState(placeholderArray4)
  const [homePageEvents2, setHomePageEvents2] = useState(placeholderArray4)
  const [homePageArticles, setHomePageArticles] = useState(null)
  const [homePageArticles1, setHomePageArticles1] = useState(placeholderArray20)
  const [homePageArticles2, setHomePageArticles2] = useState(placeholderArray2)
  const [homePageGroups, setHomePageGroups] = useState(null)
  const [homePageGroups1, setHomePageGroups1] = useState(null)
  const [homePageGroups2, setHomePageGroups2] = useState(null)
  // =========================
  const [newsPageArticles, setNewsPageArticles] = useState(null)
  const [newsPageArticles1, setNewsPageArticles1] = useState(placeholderArray15)
  const [newsPageArticles2, setNewsPageArticles2] = useState(placeholderArray6)
  // =========================
  const [eventsPageGroups, setEventsPageGroups] = useState(null)
  const [eventsPageEvents, setEventsPageEvents] = useState(null)
  const [eventsPageEvents1, setEventsPageEvents1] = useState(placeholderArray12)
  const [eventsPageEvents2, setEventsPageEvents2] = useState(placeholderArray4)
  // =========================
  const [groupsPageGroups, setGroupsPageGroups] = useState(null)
  const [groupsPageGroups1, setGroupsPageGroups1] = useState(null)
  const [groupsPageGroups2, setGroupsPageGroups2] = useState(null)
  // =========================
  const [sidebarArticles, setSidebarArticles] = useState(null)
  const [sidebarArticles1, setSidebarArticles1] = useState(placeholderArray4)
  const [sidebarArticles2, setSidebarArticles2] = useState(placeholderArray4)
  const [sidebarArticles3, setSidebarArticles3] = useState(placeholderArray4)
  const [sidebarGroups, setSidebarGroups] = useState(null)
  const [sidebarGroups1, setSidebarGroups1] = useState(placeholderArray4)
  const [sidebarGroups2, setSidebarGroups2] = useState(placeholderArray4)
  const [sidebarGroups3, setSidebarGroups3] = useState(placeholderArray4)
  // =========================
  const [trendingBarCategories, setTrendingBarCategories] =
    useState(placeholderArray20)

  // ========================= sidebar =========================

  const useSidebarArticles = () => {
    useEffect(() => {
      const fetchData = async () => {
        let items = await fetchSidebarArticles()
        if (items) setSidebarArticles(items)
      }
      if (!sidebarArticles) fetchData()
      if (sidebarArticles) {
        let newArray1 = Array.from(sidebarArticles)
        let newArray2 = newArray1.splice(3)
        let newArray3 = newArray2.splice(3)
        newArray3.splice(3)
        setSidebarArticles1(newArray1)
        setSidebarArticles2(newArray2)
        setSidebarArticles3(newArray3)
      }
    }, [sidebarArticles])

    return { sidebarArticles1, sidebarArticles2, sidebarArticles3 }
  }

  const useSidebarGroups = () => {
    useEffect(() => {
      const fetchData = async () => {
        let items = await fetchSidebarGroups()
        if (items) setSidebarGroups(items)
      }
      if (!sidebarGroups) fetchData()
      if (sidebarGroups) {
        let newArray1 = Array.from(sidebarGroups)
        let newArray2 = newArray1.splice(3)
        let newArray3 = newArray2.splice(4)
        newArray3.splice(1)
        setSidebarGroups1(newArray1)
        setSidebarGroups2(newArray2)
        setSidebarGroups3(newArray3)
      }
    }, [sidebarGroups])

    return { sidebarGroups1, sidebarGroups2, sidebarGroups3 }
  }

  // ========================= home page =========================

  const useHomePageEvents = () => {
    useEffect(() => {
      const fetchData = async () => {
        let items = await fetchHomePageEvents()
        if (items) setHomePageEvents(items)
      }
      if (!homePageEvents) fetchData()
      if (homePageEvents) {
        let newArray1 = Array.from(homePageEvents)
        let newArray2 = newArray1.splice(4)
        newArray2.splice(4)
        setHomePageEvents1(newArray1)
        setHomePageEvents2(newArray2)
      }
    }, [homePageEvents])
    return { homePageEvents1, homePageEvents2 }
  }

  const useHomePageArticles = () => {
    useEffect(() => {
      const fetchData = async () => {
        let items = await fetchHomePageArticles()
        if (items) setHomePageArticles(items)
      }
      if (!homePageArticles) fetchData()
      if (homePageArticles) {
        let newArray1 = Array.from(homePageArticles)
        let newArray2 = newArray1.splice(15)
        newArray2.splice(5)
        setHomePageArticles1(newArray1)
        setHomePageArticles2(newArray2)
      }
    }, [homePageArticles])
    return {
      homePageArticles1,
      homePageArticles2
    }
  }

  const useHomePageGroups = () => {
    useEffect(() => {
      const fetchData = async () => {
        let items = await fetchHomePageGroups()
        if (items) setHomePageGroups(items)
      }
      if (!homePageGroups) fetchData()
      if (homePageGroups) {
        let newArray1 = Array.from(homePageGroups)
        let newArray2 = newArray1.splice(4)
        newArray2.splice(20)
        setHomePageGroups1(newArray1)
        setHomePageGroups2(newArray2)
      }
    }, [homePageGroups])

    return {
      homePageGroups1,
      homePageGroups2
    }
  }

  // ========================= trending bar =========================

  const useTrendingBarCategories = () => {
    useEffect(() => {
      const fetchData = async () => {
        let items = await fetchTrendingBarCategories()
        if (items) setTrendingBarCategories(items)
      }
      if (
        !trendingBarCategories ||
        (trendingBarCategories[0] && trendingBarCategories[0].placeholder)
      )
        fetchData()
    }, [trendingBarCategories])

    return { trendingBarCategories }
  }

  // ========================= articles page =========================

  const useNewsPageArticles = () => {
    useEffect(() => {
      const fetchData = async () => {
        let items = await fetchNewsPageArticles()
        if (items) setNewsPageArticles(items)
      }
      if (!newsPageArticles) fetchData()
      if (newsPageArticles) {
        let newArray1 = Array.from(newsPageArticles)
        let newArray2 = newArray1.splice(20)
        newArray2.splice(20)
        setNewsPageArticles1(newArray1)
        setNewsPageArticles2(newArray2)
      }
    }, [newsPageArticles])

    return {
      newsPageArticles1,
      newsPageArticles2
    }
  }

  // ========================= events page =========================

  const useEventsPageEvents = () => {
    useEffect(() => {
      const fetchData = async () => {
        let items = await fetchEventsPageEvents()
        if (items) setEventsPageEvents(items)
      }
      if (!eventsPageEvents) fetchData()
      if (eventsPageEvents) {
        let newArray1 = Array.from(eventsPageEvents)
        let newArray2 = newArray1.splice(20)
        newArray2.splice(20)
        setEventsPageEvents1(newArray1)
        setEventsPageEvents2(newArray2)
      }
    }, [eventsPageEvents])

    return {
      eventsPageEvents1,
      eventsPageEvents2
    }
  }

  const useEventsPageGroups = () => {
    useEffect(() => {
      const fetchData = async () => {
        let items = await fetchHomePageGroups()
        if (items) setEventsPageGroups(items)
      }
      if (!eventsPageGroups) fetchData()
    }, [eventsPageGroups])

    return { eventsPageGroups }
  }

  // ========================= trending bar =========================

  const useGroupsPageGroups = () => {
    useEffect(() => {
      const fetchData = async () => {
        let items = await fetchGroupsPageGroups()
        if (items) setGroupsPageGroups(items)
      }
      if (!groupsPageGroups) fetchData()
      if (groupsPageGroups) {
        let newArray1 = Array.from(groupsPageGroups)
        let newArray2 = newArray1.splice(16)
        newArray2.splice(10)
        setGroupsPageGroups1(newArray1)
        setGroupsPageGroups2(newArray2)
      }
    }, [groupsPageGroups])

    return {
      groupsPageGroups1,
      groupsPageGroups2
    }
  }

  // ============================================================

  return (
    <DatabaseContext.Provider
      value={{
        useHomePageEvents,
        useHomePageGroups,
        useHomePageArticles,
        useEventsPageGroups,
        useEventsPageEvents,
        useGroupsPageGroups,
        useTrendingBarCategories,
        useNewsPageArticles,
        useSidebarGroups,
        useSidebarArticles
      }}
    >
      {children}
    </DatabaseContext.Provider>
  )
}
