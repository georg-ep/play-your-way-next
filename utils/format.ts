export function format(dateTimeString: string): string {
    const dateTime = new Date(dateTimeString);
    
    // Format the date
    const optionsDate: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    };
    const formattedDate = dateTime.toLocaleDateString(undefined, optionsDate);
    
    // Format the time
    const optionsTime: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
    };
    const formattedTime = dateTime.toLocaleTimeString(undefined, optionsTime);
    
    return `${formattedDate} at ${formattedTime}`;
  }