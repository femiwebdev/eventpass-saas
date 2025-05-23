"use client"

import * as React from "react"
import { Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface TimePickerProps {
  value?: string
  onChange?: (time: string) => void
}

export function TimePickerDemo({ value, onChange }: TimePickerProps) {
  const [hours, setHours] = React.useState<number>(0)
  const [minutes, setMinutes] = React.useState<number>(0)
  const [period, setPeriod] = React.useState<"AM" | "PM">("AM")
  const [is24Hour, setIs24Hour] = React.useState<boolean>(false)
  const [displayTime, setDisplayTime] = React.useState<string>("")

  // Initialize from value if provided
  React.useEffect(() => {
    if (value) {
      const [hourStr, minuteStr] = value.split(":")
      let hour = Number.parseInt(hourStr, 10)
      const minute = Number.parseInt(minuteStr, 10)

      if (!is24Hour && hour >= 12) {
        setPeriod("PM")
        if (hour > 12) hour -= 12
      } else {
        setPeriod("AM")
        if (hour === 0) hour = 12
      }

      setHours(hour)
      setMinutes(minute)
      updateDisplayTime(hour, minute, is24Hour ? undefined : period)
    }
  }, [value, is24Hour])

  const updateDisplayTime = (h: number, m: number, p?: "AM" | "PM") => {
    let displayH = h

    if (!is24Hour) {
      // For 12-hour format
      if (p === "PM" && h < 12) displayH = h + 12
      if (p === "AM" && h === 12) displayH = 0
    }

    // For output value (always in 24-hour format for HTML time input)
    const outputH = p === "PM" && h < 12 ? h + 12 : p === "AM" && h === 12 ? 0 : h
    const timeValue = `${outputH.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`

    // For display
    if (is24Hour) {
      setDisplayTime(`${displayH.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`)
    } else {
      const displayHour = displayH === 0 ? 12 : displayH > 12 ? displayH - 12 : displayH
      setDisplayTime(`${displayHour}:${m.toString().padStart(2, "0")} ${p}`)
    }

    if (onChange) {
      onChange(timeValue)
    }
  }

  const handleHourChange = (value: string) => {
    const hour = Number.parseInt(value, 10)
    setHours(hour)
    updateDisplayTime(hour, minutes, is24Hour ? undefined : period)
  }

  const handleMinuteChange = (value: string) => {
    const minute = Number.parseInt(value, 10)
    setMinutes(minute)
    updateDisplayTime(hours, minute, is24Hour ? undefined : period)
  }

  const handlePeriodChange = (value: string) => {
    const newPeriod = value as "AM" | "PM"
    setPeriod(newPeriod)
    updateDisplayTime(hours, minutes, newPeriod)
  }

  const handleFormatToggle = () => {
    const newFormat = !is24Hour
    setIs24Hour(newFormat)

    // Recalculate the time based on the new format
    updateDisplayTime(hours, minutes, newFormat ? undefined : period)
  }

  // Generate hours options
  const hoursOptions = React.useMemo(() => {
    const options = []
    const max = is24Hour ? 23 : 12
    const min = is24Hour ? 0 : 1

    for (let i = min; i <= max; i++) {
      options.push(
        <SelectItem key={i} value={i.toString()}>
          {i.toString().padStart(2, "0")}
        </SelectItem>,
      )
    }

    return options
  }, [is24Hour])

  // Generate minutes options
  const minutesOptions = React.useMemo(() => {
    const options = []

    for (let i = 0; i < 60; i++) {
      options.push(
        <SelectItem key={i} value={i.toString()}>
          {i.toString().padStart(2, "0")}
        </SelectItem>,
      )
    }

    return options
  }, [])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal transition-all duration-300",
            !displayTime && "text-muted-foreground",
            "hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-[1.02]",
          )}
        >
          <Clock className="mr-2 h-4 w-4" />
          {displayTime ? displayTime : "Select time"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-sm font-medium">Time Format</Label>
            <Button variant="outline" size="sm" onClick={handleFormatToggle} className="text-xs h-7">
              {is24Hour ? "Switch to 12h" : "Switch to 24h"}
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Select value={hours.toString()} onValueChange={handleHourChange}>
              <SelectTrigger className="w-[70px]">
                <SelectValue placeholder="Hour" />
              </SelectTrigger>
              <SelectContent>{hoursOptions}</SelectContent>
            </Select>

            <span className="text-center">:</span>

            <Select value={minutes.toString()} onValueChange={handleMinuteChange}>
              <SelectTrigger className="w-[70px]">
                <SelectValue placeholder="Min" />
              </SelectTrigger>
              <SelectContent>{minutesOptions}</SelectContent>
            </Select>

            {!is24Hour && (
              <Select value={period} onValueChange={handlePeriodChange}>
                <SelectTrigger className="w-[70px]">
                  <SelectValue placeholder="AM/PM" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AM">AM</SelectItem>
                  <SelectItem value="PM">PM</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
