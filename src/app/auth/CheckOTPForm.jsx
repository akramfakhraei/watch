function CheckOTPForm({onSubmit}) {
    return (
        <div>
            <form className=" space-y-10" onSubmit={onSubmit}>
                <p> کد تایید را وارد کنید </p>
                    <button type="submit" className="btn btn--primary w-full">
                        تایید
                    </button>s
            </form>
        </div>
    )
}
export default CheckOTPForm;
