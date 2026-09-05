/**
 * Represents a masking utility to format input based on a specified mask.
 */
export type MaskOptions = {
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
     * - The mask pattern, an array of mask patterns, or a function returning the mask pattern based on the input element.
     */
    mask?: string | string[] | ((input: HTMLInputElement) => string);
};
/**
 * The Mask class provides methods for input masking and management.
 */
declare class Mask {
    #private;
    opts: {
        keyEvent: string;
        triggerOnBlur: boolean;
        triggerOnDelete: boolean;
        dynamicDataMask: boolean;
        init: boolean;
        mask: MaskOptions['mask'];
    };
    events: Set<any>;
    input: HTMLInputElement;
    maskObserver: MutationObserver | undefined;
    /**
     * Checks if a Mask instance exists for the given input element.
     * @param {HTMLInputElement} input - The input element to check.
     * @returns {Mask|null} The Mask instance associated with the input element, or null if not found.
     */
    static data(input: HTMLInputElement): Mask | null;
    /**
     * Core method to mask the input value according to the specified mask pattern.
     * @param {string} _value - The input value to be masked.
     * @param {string} _mask - The mask pattern to apply.
     * @returns {string} The masked input value.
     */
    static core(_value: string, _mask: string): string;
    /**
     * Mask the input value according to the specified mask pattern.
     * @param {string} _value - The input value to be masked.
     * @param {string} _mask - The mask pattern to apply.
     * @returns {string} The masked input value.
     * @deprecated Use core method instead. This is an alias for backward compatibility.
     */
    static masking(_value: string, _mask: string): string;
    /**
     * The current mask pattern applied to the input.
     * @type {string|undefined}
     */
    mask: string | undefined;
    /**
     * Constructs a new Mask instance for the given input element.
     *
     * @param {HTMLInputElement} input - The input element to apply the mask to.
     * @param {MaskOptions} [opts] - The options for the Mask instance.
     * @throws {TypeError} If the input parameter is not an instance of HTMLInputElement.
     * @throws {TypeError} If the input has already been instanced.
     * @throws {Error} If the mask is empty.
     */
    constructor(input: HTMLInputElement, opts?: MaskOptions);
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
}
export default Mask;
