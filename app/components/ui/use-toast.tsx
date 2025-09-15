export function useToast() {
  return {
    toast: ({ title, description }: { title: string; description: string }) => {
      window.alert(`${title}\n${description}`);
    }
  };
}
