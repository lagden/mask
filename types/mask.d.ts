export default Mask;
/**
 * The Mask class provides methods for input masking and management.
 */
declare class Mask {
    /**
     * Checks if a Mask instance exists for the given input element.
     * @param {HTMLInputElement} input - The input element to check.
     * @returns {Mask|null} The Mask instance associated with the input element, or null if not found.
     */
    static data(input: HTMLInputElement): Mask | null;
    /**
     * Mask the input value according to the specified mask pattern.
     * @param {string} _value - The input value to be masked.
     * @param {string} _mask - The mask pattern to apply.
     * @returns {string} The masked input value.
     */
    static masking(_value: string, _mask: string): string;
    /**
     * Constructs a new Mask instance for the given input element.
     *
     * @param {HTMLInputElement} input - The input element to apply the mask to.
     * @param {MaskOptions} [opts] - The options for the Mask instance.
     * @throws {TypeError} If the input parameter is not an instance of HTMLInputElement.
     * @throws {TypeError} If the input has already been instanced.
     * @throws {Error} If the mask is empty.
     */
    constructor(input: HTMLInputElement, opts?: {
        /**
         * - The key event to listen for (e.g., 'input', 'keyup').
         */
        keyEvent?: string;
        /**
         * - Whether to trigger masking on the blur event.
         */
        triggerOnBlur?: boolean;
        /**
         * - Whether to trigger masking on delete events (e.g., 'deleteContentBackward', 'deleteContentForward').
         */
        triggerOnDelete?: boolean;
        /**
         * - Whether to dynamically update the mask based on the input's data-mask attribute.
         */
        dynamicDataMask?: boolean;
        /**
         * - Whether to apply masking on initialization.
         */
        init?: boolean;
        /**
         * - The mask pattern or a function returning the mask pattern based on the input element.
         */
        mask?: string | Function;
    });
    opts: {
        /**
         * - The key event to listen for (e.g., 'input', 'keyup').
         */
        keyEvent?: string;
        /**
         * - Whether to trigger masking on the blur event.
         */
        triggerOnBlur?: boolean;
        /**
         * - Whether to trigger masking on delete events (e.g., 'deleteContentBackward', 'deleteContentForward').
         */
        triggerOnDelete?: boolean;
        /**
         * - Whether to dynamically update the mask based on the input's data-mask attribute.
         */
        dynamicDataMask?: boolean;
        /**
         * - Whether to apply masking on initialization.
         */
        init?: boolean;
        /**
         * - The mask pattern or a function returning the mask pattern based on the input element.
         */
        mask?: string | Function;
    };
    events: Set<any>;
    input: HTMLInputElement;
    maskObserver: MutationObserver;
    mask: any;
    /**
     * Get the unmasked input value (removes non-digit and non-alphabetic characters).
     * @returns {string} The unmasked input value.
     */
    getUnmasked(): string;
    /**
     * Handles events triggered on the input element.
     *
     * @param {Event} event - The event object.
     * @returns {boolean} Whether to continue processing the event.
     */
    handleEvent(event: Event): boolean;
    /**
     * Destroys the Mask instance, removing event listeners and cleaning up references.
     */
    destroy(): void;
    #private;
}
