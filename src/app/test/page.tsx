export default function Test() {
    return (
        <div className="flex flex-col lg:flex-row gap-6 p-6">
            <div className="hidden lg:block w-1/4">
                <div className="sticky top-0">
                </div>
            </div>

            <div className="flex-1 mb-6">
                <h1 className="text-3xl font-bold text-center mb-4">
                    Test Page
                </h1>
            </div>
        </div>
    );
}